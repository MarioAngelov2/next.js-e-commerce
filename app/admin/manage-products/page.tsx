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
        <div className="max-w-[1280px] mx-auto xl:px-20 md:px-2 px-4">
            <ManageProductsClient products={products} />
        </div>
    );
};

export default ManageProducts;
