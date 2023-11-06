import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface Params {
    productId?: string;
}

const ProductId = async ({ params }: { params: Params }) => {
    const product = await getProductById(params);

    if (!product) {
        return <NullData title="Something went wrong. Try again later."/>
    }

    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
    );
};

export default ProductId;
