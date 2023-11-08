import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
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
    const product = await prisma.product.delete({
        where: { id: params.id },
    });

    return NextResponse.json(product);
}
