"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { BsCart3 } from "react-icons/bs";

const CartCount = () => {
    const { cartTotalQuantity } = useCart();
    const router = useRouter();

    return (
        <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
        >
            <div className="text-3xl">
                <BsCart3 />
            </div>
            <span
                className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 
            rounded-full flex items-center justify-center text-sm"
            >
                {cartTotalQuantity}
            </span>
        </div>
    );
};

export default CartCount;
