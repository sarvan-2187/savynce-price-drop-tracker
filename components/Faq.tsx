"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
    return (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">

                <h2 className="text-2xl font-bold text-center mb-10">
                    Frequently Asked Questions
                </h2>

                <Accordion type="single" collapsible className="w-full space-y-4">

                    <AccordionItem value="item-1" className="bg-white/50 rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium">
                            How does Savynce track product prices?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Savynce periodically checks the product page and monitors price
                            changes. When a drop is detected, you receive an instant alert.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="bg-white rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium">
                            Is Savynce free to use?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Yes, Savynce is free for basic price tracking. Advanced features
                            may be introduced in the future.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="bg-white rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium">
                            How often are prices checked?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Prices are checked periodically through our background monitoring
                            system to ensure timely updates.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="bg-white rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium">
                            Will I get notified immediately?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Yes. When a price drop is detected, you receive an email alert
                            instantly.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>

            </div>
        </section>
    );
};

export default Faq;
