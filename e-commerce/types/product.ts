export interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: selectedImgType;
    quantity: number;
    price: number;
};

export type selectedImgType = {
    color: string;
    colorCode: string;
    image: string;
};
