"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { ImageType, UploadedImageType } from "@/types/product";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { handleImageUploadsToFirebase } from "@/app/admin/add-products/FirebaseImgUpload";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState<boolean>(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            inStock: false,
            images: [],
            price: "",
        },
    });

    useEffect(() => {
        setCustomValue("images", images);
    }, [images]);

    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        let uploadedImages: UploadedImageType[] = [];

        if (!data.category) {
            setIsLoading(false);
            return toast.error("Category is not selected");
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false);
            return toast.error("No images uploaded");
        }

        // UPLOAD IMAGES TO FIREBASE STORAGE
        const propsData = {
            brand: data.brand,
            category: data.category,
            description: data.description,
            images: data.images,
            inStock: data.inStock,
            name: data.name,
            price: parseFloat(data.price),
        };

        await handleImageUploadsToFirebase(propsData, uploadedImages);
        setIsLoading(false);

        // SAVE PRODUCT TO DATABASE
        const productData = { ...data, images: uploadedImages };

        axios
            .post("/api/product", productData)
            .then(() => {
                toast.success("Product created successfully");
                setIsProductCreated(true);
                router.refresh();
            })
            .catch((error) => {
                toast.error("Something went wrong");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const category = watch("category");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value];
            }

            return [...prev, value];
        });
    }, []);

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter(
                    (item) => item.color !== value.color
                );
                return filteredImages;
            }

            return prev;
        });
    }, []);

    return (
        <>
            <Heading title="Add product" center />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="price"
                label="Price"
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="brand"
                label="Brand"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomCheckbox
                id="inStock"
                register={register}
                label="This Product is in stock"
            />
            <div className="w-full font-medium">
                <div className="mb-2 font-bold">Select a Category</div>
                <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-4 text-xs md:text-base">
                    {categories.map((item) => {
                        if (item.label === "All") {
                            return null;
                        }

                        return (
                            <div key={item.label} className="col-span">
                                <CategoryInput
                                    onClick={(category) =>
                                        setCustomValue("category", category)
                                    }
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className="font-bold">
                        Select the availabe product colors and upload their
                        images.
                    </div>
                    <div className="text-xs md:text-sm mt-2">
                        You must upload an images for each of the color selected
                        otherwise your color selection will be ignored.
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                    {colors.map((item, index) => (
                        <SelectColor
                            key={index}
                            imageData={item}
                            addImageToState={addImageToState}
                            removeImageFromState={removeImageFromState}
                            isProductCreated={isProductCreated}
                        />
                    ))}
                </div>
            </div>
            <Button
                label={isLoading ? "Loading..." : "Add Product"}
                onClick={handleSubmit(onSubmit)}
            />
        </>
    );
};

export default AddProductForm;
