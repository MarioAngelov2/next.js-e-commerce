import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface Params {
    productId?: string;
}

const ProductId = async ({ params }: { params: Params }) => {
    const product = await getProductById(params);
    const user = await getCurrentUser();

    if (!product) {
        return <NullData title="Something went wrong. Try again later." />;
    }

    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
                <div className="flex flex-col mt-20 gap-4">
                    <AddRating product={product} user={user || null} />
                    <ListRating product={product} />
                </div>
            </Container>
        </div>
    );
};

export default ProductId;
