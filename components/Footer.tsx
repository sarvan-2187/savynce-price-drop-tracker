"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-gray-400">
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-black text-lg font-semibold">
                            Savynce
                        </h3>
                        <p className="text-sm mt-2 text-gray-700">
                            Smart price tracking. Simple savings.
                        </p>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-600">
                    © {new Date().getFullYear()} Savynce. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
