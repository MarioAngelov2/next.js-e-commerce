import { product } from "@/utils/product";
import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";

interface Params {
    productId?: string;
}

const ProductId = ({ params }: { params: Params }) => {
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
