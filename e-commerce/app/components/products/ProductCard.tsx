"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();
    const productRating =
        data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
        data.reviews.length;

    return (
        <div
            onClick={() => router.push(`/product/${data.id}`)}
            className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50
        rounded-sm p-2 transition duration-300 hover:scale-105 text-center text-sm"
        >
            <div className="flex flex-col items-center justify-between w-full max-h-[280px] md:max-h-[340px] h-screen gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image
                        src={data.images[0].image}
                        alt={data.name}
                        fill
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col">
                <div className="mt-4">{truncateText(data.name)}</div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div>{data.reviews.length} reviews</div>
                <div className="font-semibold">{formatPrice(data.price)}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
