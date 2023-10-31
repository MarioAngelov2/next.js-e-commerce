"use client";

import { CartProductType } from "@/types/product";
import React from "react";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ProductContentProps {
    product: CartProductType;
}

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
    const {handleRemoveProductFromCart} = useCart();

    return (
        <div
            className="grid grid-cols-5 text-xs md:text-sm gap-4 
            border-t-[1.5px] border-slate-200 py-4 items-center"
        >
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${product.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image
                            src={product.selectedImg.image}
                            alt="product image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${product.id}`}>
                        {truncateText(product.name)}
                    </Link>
                    <div>{product.selectedImg.color}</div>
                    <div className="w-[70px] ">
                        <button
                            onClick={() => handleRemoveProductFromCart(product)}
                            className="text-slate-500 underline"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">
                {formatPrice(product.price)}
            </div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={product}
                    handleQuantityIncrease={() => {}}
                    handleQuantityDecrease={() => {}}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(product.price * product.quantity)}
            </div>
        </div>
    );
};

export default ProductContent;
