"use client";
import { CartProductType, selectedImgType } from "@/types/product";
import React from "react";

interface SetColorProps {
    images: selectedImgType[];
    cartProduct: CartProductType;
    handleColorSelect: (value: selectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
    images,
    cartProduct,
    handleColorSelect,
}) => {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold">COLOR:</span>
                <div className="flex gap-1">
                    {images.map((img) => (
                        <div
                            onClick={() => handleColorSelect(img)}
                            key={img.color}
                            className={`h-7 w-7 rounded-full border-teal-300 flex items-center
                            justify-center ${
                                cartProduct.selectedImg.color === img.color
                                    ? "border-[1.5px]"
                                    : "border-none"
                            }`}
                        >
                            <div
                                style={{ background: img.colorCode }}
                                className="h-5 w-5 rounded-full border-[1.5px] border-slate-300 cursor-pointer"
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SetColor;
