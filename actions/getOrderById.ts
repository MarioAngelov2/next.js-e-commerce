import prisma from "@/libs/prismadb";

interface IParams {
    orderId?: string;
}

export default async function getOrderById(params: IParams) {
    try {
        const orderId = params.orderId;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            null;
        }

        return order;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}
