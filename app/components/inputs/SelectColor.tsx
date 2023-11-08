"use client";

import { ImageType } from "@/types/product";
import React, { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface SelectColorProps {
    imageData: ImageType;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
    imageData,
    addImageToState,
    removeImageFromState,
    isProductCreated,
}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (isProductCreated) {
            setIsSelected(false);
            setFile(null);
        }
    }, [isProductCreated]);

    const handleFileChange = useCallback((value: File) => {
        setFile(value);
        addImageToState({ ...imageData, image: value });
    }, []);

    const handleCheck = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setIsSelected(ev.target.checked);

            if (!ev.target.checked) {
                setFile(null);
                removeImageFromState(imageData);
            }
        },
        []
    );

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto 
            border-[1.5px] border-slate-200 items-center p-2"
        >
            <div className="flex flex-row gap-2 items-center h-[60px]">
                <input
                    id={imageData.color}
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheck}
                    className="cursor-pointer"
                />
                <label
                    htmlFor={imageData.color}
                    className="font-medium cursor-pointer"
                >
                    {imageData.color}
                </label>
            </div>
            <>
                {isSelected && !file && (
                    <div className="col-span-2 text-center">
                        <SelectImage
                            item={imageData}
                            handleFileChange={handleFileChange}
                        />
                    </div>
                )}
                {file && (
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file?.name}</p>
                        <div className="w-[70px]">
                            <Button
                                label="Cancel"
                                small
                                outline
                                onClick={() => {
                                    setFile(null);
                                    removeImageFromState(imageData);
                                }}
                            />
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default SelectColor;
