import React from "react";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import getOrders from "@/actions/getOrders";
import NullData from "../components/NullData";
import Container from "../components/Container";

const Admin = async () => {
    const products = await getProducts({ category: null });
    const orders = await getOrders();
    const users = await getUsers();

    if (!orders) {
        return <NullData title="No orders found" />;
    }

    return (
        <Container>
            <Summary products={products} orders={orders} users={users} />
        </Container>
    );
};

export default Admin;
