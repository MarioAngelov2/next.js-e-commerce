export const revalidate = 0;
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
    searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
    const products = await getProducts(searchParams);

    if (products.length === 0) {
        return (
            <NullData
                title={`No products found. Click "All" to clear filters`}
            />
        );
    }

    // SHUFFLE PRODUCTS
    const shuffleArrayProducts = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };

    const shuffleProducts = shuffleArrayProducts(products);

    return (
        <div className="p-8">
            <Container>
                <div>
                    <HomeBanner />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
                    {shuffleProducts.map((product: any) => (
                        <div key={product.id}>
                            <ProductCard data={product} key={product.id} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
