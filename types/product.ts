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

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
};

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
};
