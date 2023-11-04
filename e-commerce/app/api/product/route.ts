import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return NextResponse.error();
    }

    const body = await request.json();

    const { name, description, price, brand, category, inStock, images } = body;

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price: parseFloat(price),
            brand,
            category,
            inStock,
            images,
        },
    });

    return NextResponse.json(product);
}
