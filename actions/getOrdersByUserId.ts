import prisma from "@/libs/prismadb";

export async function getOrdersByUserId(userId: string) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
            },
            orderBy: { createDate: "desc" },
            where: {
                userId: userId,
            },
        });

        return orders;
    } catch (error) {
        console.log(error);
    }
}
