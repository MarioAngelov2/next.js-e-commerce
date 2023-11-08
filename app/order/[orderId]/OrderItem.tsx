import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface OrderItemProps {
    item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    return (
        <div
            className="flex flex-wrap justify-between md:grid grid-cols-5 text-xs md:text-sm gap-4 border-top-[1.5px]
    border-slate-200 py-4 items-center"
        >
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <div className="relative w-[70px] aspect-square">
                    <Image
                        src={item.selectedImg.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div>{truncateText(item.name)}</div>
                    <div>{item.selectedImg.color}</div>
                </div>
            </div>
            <div className="flex items-ceter gap-1 md:justify-self-center">
                <div className="md:hidden">Price:</div>
                <div>{formatPrice(item.price)}</div>
            </div>

            <div className="flex items-ceter gap-1 md:justify-self-center">
                <div className="md:hidden">Quantity:</div>
                <div>{item.quantity}</div>
            </div>

            <div className="flex items-center gap-1 md:justify-self-end font-semibold">
                <div className="md:hidden">Total:</div>
                <div>{formatPrice(item.price * item.quantity)}</div>
            </div>
        </div>
    );
};

export default OrderItem;
