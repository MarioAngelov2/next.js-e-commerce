"use client";

import React, { useState } from "react";
import { Rating } from "@mui/material";
import {
    ProductDetailsProps,
    CartProductType,
    selectedImgType,
} from "@/types/product";
import { HorizontalLine } from "@/utils/horizontalLine";

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });

    const productRating =
        product.reviews.reduce(
            (acc: number, item: any) => item.rating + acc,
            0
        ) / product.reviews.length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>images</div>
            <div className="flex flex-col gap-2 text-slate-500 text-sm">
                <h2 className="text-2xl font-medium text-slate-700">
                    {product.name}
                </h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <HorizontalLine />
                <div className="text-justify">{product.description}</div>
                <HorizontalLine />
                <div>
                    <span className="font-semibold">CATEGORY:</span>
                    {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span>
                    {product.brand}
                </div>
                <div
                    className={
                        product.inStock ? "text-teal-500" : "text-rose-400"
                    }
                >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
                <HorizontalLine />
                <div>color</div>
                <HorizontalLine />
                <div>quantity</div>
                <HorizontalLine />
                <div>add to cart</div>
            </div>
        </div>
    );
};

export default ProductDetails;
