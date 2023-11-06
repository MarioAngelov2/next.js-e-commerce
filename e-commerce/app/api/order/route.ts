import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    if (user.role !== "ADMIN") {
        return NextResponse.error();
    }

    const body = await request.json();

    const { id, deliveryStatus } = body;

    const order = await prisma.order.update({
        where: { id: id },
        data: { deliveryStatus },
    });

    return NextResponse.json(order);
}
