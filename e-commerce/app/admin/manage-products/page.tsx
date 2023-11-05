import React from "react";
import ManageProductsClient from "./ManageProductsClient";
import Container from "@/app/components/Container";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {
    const products = await getProducts({ category: null });
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return <NullData title="Access denied" />;
    }

    return (
        <div>
            <Container>
                <ManageProductsClient products={products}/>
            </Container>
        </div>
    );
};

export default ManageProducts;
