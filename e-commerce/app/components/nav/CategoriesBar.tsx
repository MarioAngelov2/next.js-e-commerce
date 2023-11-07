'use client'

import React from "react";
import Container from "../Container";
import { categories } from "@/utils/categories";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const CategoriesBar = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathName = usePathname();

    const isMainPage = pathName === "/";

    console.log(params.toString())
    console.log(category)

    if (!isMainPage) {
        return null;
    }

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row gap-4 md:gap-0 items-center justify-between overflow-x-auto">
                    {categories.map((item) => (
                        <Category
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={
                                category === item.label ||
                                (category === null && item.label === "All")
                            }
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default CategoriesBar;
