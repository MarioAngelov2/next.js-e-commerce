"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import {
    ProductDetailsProps,
    CartProductType,
    selectedImgType,
} from "@/types/product";
import { HorizontalLine } from "@/utils/horizontalLine";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { useCart } from "@/hooks/useCart";
import { BiCheckCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });
    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false);

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts]);

    const productRating =
        product.reviews.reduce(
            (acc: number, item: any) => item.rating + acc,
            0
        ) / product.reviews.length;

    const handleColorSelect = useCallback(
        (value: selectedImgType) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImg: value };
            });
        },
        [cartProduct.selectedImg]
    );

    const handleQuantityIncrease = useCallback(() => {
        if (cartProduct.quantity >= 99) return;

        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, [cartProduct]);

    const handleQuantityDecrease = useCallback(() => {
        if (cartProduct.quantity <= 1) return;

        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 };
        });
    }, [cartProduct]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-2 text-slate-500 text-sm md:text-base">
                <h2 className="text-2xl font-medium text-slate-700">
                    {product.name}
                </h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <HorizontalLine />
                <div className="text-justify">{product.description}</div>
                <HorizontalLine />
                <div>
                    <span className="font-semibold">PRICE: </span>
                    ${product.price.toLocaleString("en-US")}
                </div>
                <div>
                    <span className="font-semibold">CATEGORY: </span>
                    {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND: </span>
                    {product.brand}
                </div>
                <div
                    className={
                        product.inStock ? "text-teal-500" : "text-rose-400"
                    }
                >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
                <HorizontalLine />
                {isProductInCart ? (
                    <>
                        <p className="mb-2 text-slate-500 flex items-center gap-2">
                            <BiCheckCircle
                                size={20}
                                className="text-teal-400"
                            />
                            <span>Product added to cart</span>
                        </p>
                        <div className="max-w-[300px]">
                            <Button label="View cart" outline onClick={() => router.push('/cart')}/>
                        </div>
                    </>
                ) : (
                    <>
                        <SetColor
                            cartProduct={cartProduct}
                            images={product.images}
                            handleColorSelect={handleColorSelect}
                        />
                        <HorizontalLine />
                        <SetQuantity
                            cartProduct={cartProduct}
                            handleQuantityIncrease={handleQuantityIncrease}
                            handleQuantityDecrease={handleQuantityDecrease}
                        />
                        <HorizontalLine />
                        <div className="max-w-[300px]">
                            <Button
                                label="Add to cart"
                                onClick={() =>
                                    handleAddProductToCart(cartProduct)
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
