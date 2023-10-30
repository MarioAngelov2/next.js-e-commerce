"use client";
import { CartProductType } from "@/types/product";
import React from "react";

interface SetQuautityProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQuantityIncrease: () => void;
    handleQuantityDecrease: () => void;
}

const SetQuantity: React.FC<SetQuautityProps> = ({
    cartProduct,
    cartCounter,
    handleQuantityDecrease,
    handleQuantityIncrease,
}) => {
    return (
        <div className="flex gap-8 items-center">
            <div>
                {cartCounter ? null : (
                    <div className="font-semibold">QUANTITY:</div>
                )}
                <div className="flex gap-4 items-center text-base">
                    <button
                        className="quantity-btn"
                        onClick={handleQuantityDecrease}
                    >
                        -
                    </button>
                    <div>{cartProduct.quantity}</div>
                    <button
                        className="quantity-btn"
                        onClick={handleQuantityIncrease}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetQuantity;
