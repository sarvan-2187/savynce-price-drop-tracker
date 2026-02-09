import React from 'react';
import Image from 'next/image';
import './BrandMarquee.css';

const BrandMarquee = () => {
    const brands = [
        { name: 'Amazon', logo: '/amazon.svg', width: 0, height: 60 },
        { name: 'Flipkart', logo: '/flipkart.svg', width: 0, height: 60 },
        { name: 'Walmart', logo: '/walmart.svg', width: 0, height: 60 },
        { name: 'eBay', logo: '/ebay.svg', width: 0, height: 60 },
        { name: 'Target', logo: '/target.svg', width: 0, height: 60 },
        { name: 'ZARA', logo: '/Zara_Logo.svg', width: 0, height: 60 },
        { name: 'Tata CLiQ', logo: '/tata-cliq.svg', width: 0, height: 60 },
        { name: 'Nykaa', logo: '/Nykaa_New_Logo.svg', width: 0, height: 60 },
        { name: 'H&M', logo: '/H&M-Logo.svg', width: 0, height: 60 },
        { name: 'Reliance Digital', logo: '/Reliance_Digital.svg', width: 0, height: 60 }
    ];

    return (
        <div className="marquee-container">
            <div className="marquee-header">
                <h2 className='text-3xl font-bold text-center mb-10'>Works best for products on</h2>
            </div>

            <div className="marquee-wrapper">
                <div className="marquee-content">
                    {/* First set of brands */}
                    {brands.map((brand, index) => (
                        <div key={`brand-1-${index}`} className="brand-item">
                            <Image
                                src={brand.logo}
                                alt={`${brand.name} logo`}
                                width={brand.width}
                                height={brand.height}
                                className="brand-logo-img"
                                priority={index < 5}
                            />
                        </div>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {brands.map((brand, index) => (
                        <div key={`brand-2-${index}`} className="brand-item">
                            <Image
                                src={brand.logo}
                                alt={`${brand.name} logo`}
                                width={brand.width}
                                height={brand.height}
                                className="brand-logo-img"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandMarquee;
