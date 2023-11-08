"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { LoggedInUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
    product: Product & {
        reviews: Review[];
    };
    user:
        | (LoggedInUser & {
              orders: Order[];
          })
        | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({ defaultValues: { comment: "", rating: 0 } });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if (data.rating === 0) {
            setIsLoading(false);
            return toast.error("No rating selected");
        }

        const ratingData = { ...data, userId: user?.id, product: product };

        axios
            .post("/api/rating", ratingData)
            .then(() => {
                toast.success("Rating added successfully");
                router.refresh();
                reset();
            })
            .catch((err) => {
                toast.error("Error adding rating");
                console.log(err);
            });
    };

    if (!user || !product) return null;

    const deliveredOrder = user?.orders.some((order) => {
        return order.products.find(
            (item) =>
                item.id === product.id && order.deliveryStatus === "delivered"
        );
    });

    const userReview = product?.reviews.find((review: Review) => {
        return review.userId === user.id;
    });

    if (!deliveredOrder || userReview) return null;

    return (
        <div className="flex flex-col gap-2 max-w-[500px] mb-8">
            <Heading title="Rate this product" />
            <Rating
                onChange={(event, newValue) => {
                    setCustomValue("rating", newValue);
                }}
            />
            <Input
                id="comment"
                label="Comment"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Button
                label={isLoading ? "Loading" : "Rate Product"}
                onClick={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default AddRating;
