import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropEmail } from "@/lib/mail";
import { createClient } from "@supabase/supabase-js";
import { request } from "https";
import { NextResponse } from "next/server";
import { parse } from "path";


export async function GET() {
  return NextResponse.json({ message: "Cron job to check prices executed successfully" });
}

export async function POST() {
    try {
        const authHeader = request.headers.get("Authorization");
        const cronSecret = process.env.CRON_SECRET;
        if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const { data: products, productsError } = await supabase
            .from("products")
            .select("*");
        if (productsError) {
            console.error("Error fetching products:", productsError);
            return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
        }

        const results = {
            total: products.length,
            updated: 0,
            failed: 0,
            priceChanges: 0,
            alertsSent: 0,
        };

        for (const product of products) {
            try {
                const response = await scrapeProduct(product.url);
                if (!productData.currentPrice) {
                    results.failed++;
                    continue;
                }
                
                const newPrice = parseFloat(productData.currentPrice);
                const oldPrice = parseFloat(product.current_price);

                await supabase.from("products").update({
                    current_price: newPrice,
                    currency: productData.currencyCode || product.currency,
                    name: productData.productName || product.name,
                    image_url: productData.productImageUrl || product.image_url,
                    updated_at: new Date().toISOString(),
                });
                .eq("id", product.id);
                if (newPrice !== oldPrice) {
                    await supabase.from("price_history").insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                    });
                    
                    if (newPrice < oldPrice) {
                        const { data: { user } } =
                            await supabase.auth.admin.getUserById(product.user_id);

                        if (user?.email) {
                            await sendPriceDropEmail({
                            to: user.email,
                            productName: product.name,
                            productUrl: product.url,
                            imageUrl: product.image_url,
                            oldPrice,
                            newPrice,
                            currency: product.currency,
                            });

                            results.alertsSent++;
                        }
                        }
                }

            } catch (error) { 
                console.error(`Error processing product ${product.id}:`, error);
                results.failed++;
            }

        }
        
        return NextResponse.json({success:true, message: "Price check completed", results });
        } catch (error) { 
            console.error("Error executing cron job:", error);
            return NextResponse.json({ error: "Failed to execute cron job" }, { status: 500 });
        }
 }