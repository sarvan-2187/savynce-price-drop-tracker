import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendPriceDropEmail({
  to,
  productName,
  productUrl,
  imageUrl,
  oldPrice,
  newPrice,
  currency,
}: {
  to: string;
  productName: string;
  productUrl: string;
  imageUrl?: string;
  oldPrice: number;
  newPrice: number;
  currency: string;
}) {
  const discountPercent = (((oldPrice - newPrice) / oldPrice) * 100).toFixed(1);

  await transporter.sendMail({
    from: `"Savynce Alerts" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Price Drop: ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:40px 0;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
          
          <div style="background:#111827; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:20px;">
              Price Drop Alert
            </h1>
          </div>

          <div style="padding:30px;">
            
            ${
              imageUrl
                ? `<div style="text-align:center; margin-bottom:20px;">
                     <img src="${imageUrl}" alt="${productName}" style="max-width:200px; border-radius:8px;" />
                   </div>`
                : ""
            }

            <h2 style="font-size:18px; margin-bottom:10px; color:#111827;">
              ${productName}
            </h2>

            <p style="margin:0 0 15px; color:#6b7280;">
              Good news! The price has dropped.
            </p>

            <div style="background:#f3f4f6; padding:15px; border-radius:8px; margin-bottom:20px;">
              <p style="margin:0; font-size:14px;">
                <span style="color:#9ca3af; text-decoration:line-through;">
                  ${currency} ${oldPrice.toFixed(2)}
                </span>
                &nbsp; ➜ &nbsp;
                <span style="color:#16a34a; font-weight:bold; font-size:16px;">
                  ${currency} ${newPrice.toFixed(2)}
                </span>
              </p>
              <p style="margin:5px 0 0; color:#16a34a; font-size:14px;">
                ↓ ${discountPercent}% decrease
              </p>
            </div>

            <div style="text-align:center;">
              <a href="${productUrl}"
                 style="background:#f97316; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600;">
                View Product
              </a>
            </div>

          </div>

          <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
            You are receiving this because you're tracking this product on Savynce.
          </div>
a
        </div>
      </div>
    `,
  });
}
