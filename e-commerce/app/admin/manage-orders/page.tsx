import React from "react";
import Container from "@/app/components/Container";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";

const ManageProducts = async () => {
    const orders = await getOrders();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return <NullData title="Access denied" />;
    }

    if (!orders) {
        return <NullData title="No orders found" />;
    }

    return (
        <div className="max-w-[1280px] mx-auto xl:px-20 md:px-2 px-4">
            <ManageOrdersClient orders={orders} />
        </div>
    );
};

export default ManageProducts;
