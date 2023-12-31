"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ProductContent from "./ProductContent";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { LoggedInUser } from "@/types";

interface CartClientProps {
    currentUser: LoggedInUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
    const { cartProducts, handleClearCart, cartTotalAmout } = useCart();
    const router = useRouter();

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link
                        href="/"
                        className="text-slate-500 flex items-center gap-1 mt-2"
                    >
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className="hidden md:grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-12">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            <div className="mt-8 md:mt-0">
                {cartProducts.map((product) => (
                    <ProductContent key={product.id} product={product} />
                ))}
            </div>
            <div className="border-t-[1.5px] border-slate-300 py-4 flex justify-end gap-4">
                <div className="text-sm flex flex-col  gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmout)}</span>
                    </div>
                    <p className="text-slate-500">
                        Taxes and shipping calculate at checkout
                    </p>
                    <Button
                        label={currentUser ? "Checkout" : "Login to Checkout"}
                        onClick={() => {
                            currentUser
                                ? router.push("/checkout")
                                : router.push("/login");
                        }}
                    />
                    <Link
                        href="/"
                        className="text-slate-500 flex items-center gap-1 mt-2"
                    >
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartClient;
