import prisma from "@/libs/prismadb";
 
interface IProductParams {
    productId?: string;
}

export default async function getProductById(params: IProductParams) {
    try {
        const {productId} = params;

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                reviews: {
                    include: { user: true },
                    orderBy: { createdAt: "desc" },
                }
            }
        })

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}