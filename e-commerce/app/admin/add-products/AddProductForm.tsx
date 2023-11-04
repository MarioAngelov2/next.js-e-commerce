"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { ImageType } from "@/types/product";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState<boolean>(false);

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
        console.log(data)
    } 

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
            <Button label={isLoading ? 'Loading...' : "Add Product"} onClick={handleSubmit(onSubmit)}/>
        </>
    );
};

export default AddProductForm;
