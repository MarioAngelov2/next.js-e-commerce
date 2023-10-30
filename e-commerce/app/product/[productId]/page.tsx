import { product } from "@/utils/product";
import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";

interface Params {
    productId?: string;
}

const ProductId = ({ params }: { params: Params }) => {
    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
            </Container>
        </div>
    );
};

export default ProductId;
