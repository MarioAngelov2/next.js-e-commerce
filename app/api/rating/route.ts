import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "You must be logged in to rate a product" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { comment, rating, product, userId } = body;

        const deliveredOrder = user.orders.some((order) => {
           return order.products.find(
                (item) =>
                    item.id === product.id &&
                    order.deliveryStatus === "delivered"
            );
        });

        const userReview = product?.reviews.find((review: Review) => {
            return review.userId === user.id;
        });

        if (userReview || !deliveredOrder) {
            return NextResponse.json(
                {
                    error: "You already reviewed this product. Or is not delivered yet.",
                },
                { status: 401 }
            );
        }

        const review = await prisma?.review.create({
            data: {
                comment,
                rating,
                productId: product.id,
                userId,
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
