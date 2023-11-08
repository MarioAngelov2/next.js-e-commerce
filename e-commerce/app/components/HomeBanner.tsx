import Image from "next/image";
import React from "react";

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-500 to-gray-700 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Summer Sale!
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-2">
                        Enjoy discounts on selected items
                    </p>
                    <p className="uppercase font-bold text-yellow-400 text-2xl md:text-5xl">
                        Get 50% off
                    </p>
                </div>
                <div className="w-full md:w-1/3 relative aspect-video">
                    <Image src="/banner-image.png" alt="banner-image" fill />
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
