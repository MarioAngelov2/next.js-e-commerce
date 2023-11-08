"use client";

import { Order } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
    order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    const router = useRouter();

    return (
        <>
            <div className="max-w-[1150px] m-auto flex flex-col gap-2 text-sm md:text-base">
                <div className="mt-8">
                    <Heading title="Order Details" />
                </div>
                <div>Order ID: {order.id}</div>
                <div>
                    Total Amount:{" "}
                    <span className="font-bold">
                        {formatPrice(order.amount / 100)}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <div>Payment Status:</div>
                    <div>
                        {order.status === "pending" ? (
                            <Status
                                icon={MdAccessTimeFilled}
                                bgColor="bg-slate-200"
                                color="text-slate-700"
                                text="Pending"
                            />
                        ) : order.status === "complete" ? (
                            <Status
                                icon={MdDone}
                                bgColor="bg-green-200"
                                color="text-green-700"
                                text="Completed"
                            />
                        ) : null}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div>Delivery Status:</div>
                    <div>
                        {order.deliveryStatus === "pending" ? (
                            <Status
                                icon={MdAccessTimeFilled}
                                bgColor="bg-slate-200"
                                color="text-slate-700"
                                text="Pending"
                            />
                        ) : order.deliveryStatus === "dispatched" ? (
                            <Status
                                icon={MdDeliveryDining}
                                bgColor="bg-purple-200"
                                color="text-purple-700"
                                text="Dispatched"
                            />
                        ) : order.deliveryStatus === "delivered" ? (
                            <Status
                                icon={MdDone}
                                bgColor="bg-green-200"
                                color="text-green-700"
                                text="Completed"
                            />
                        ) : null}
                    </div>
                </div>
                <div>Date: {moment(order.createDate).fromNow()}</div>
                <div>
                    <h2 className="font-semibold mt-4 mb-2">
                        Products ordered
                    </h2>
                    <div className="hidden md:grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                        <div className="col-span-2 justify-self-start">
                            PRODUCT
                        </div>
                        <div className="justify-self-center">PRICE</div>
                        <div className="justify-self-center">QUANTITY</div>
                        <div className="justify-self-end">TOTAL</div>
                    </div>
                    {order.products && order.products.map((item) => (
                        <OrderItem key={item.id} item={item}></OrderItem>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
