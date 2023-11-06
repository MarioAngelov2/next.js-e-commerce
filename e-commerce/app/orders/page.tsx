import React from "react";
import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { getOrdersByUserId } from "@/actions/getOrdersByUserId";
import OrdersClient from "./OrdersClient";

const Orders = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return <NullData title="Access denied" />;
    }

    const orders = await getOrdersByUserId(user.id);

    if (!orders) {
        return <NullData title="No orders found" />;
    }

    return (
        <div className="max-w-[1280px] mx-auto xl:px-20 md:px-2 px-4">
            <OrdersClient orders={orders} />
        </div>
    );
};

export default Orders;
