import Container from "@/app/components/Container";
import React from "react";
import OrderDetails from "./OrderDetails";
import { products } from "@/utils/products";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
    orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
    const order = await getOrderById(params);

    if (!order) {
        return <NullData title="No orders found" />;
    }

    return (
        <div className="p-4 md:p-8">
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    );
};

export default Order;
