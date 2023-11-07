'use client'

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons/lib";
import queryString from "query-string";

interface CategoryProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleCategoryChange = useCallback(() => {
        if (label === "All") {
            router.push("/");
        } else {
            let currentQuerry = {};

            if (params) {
                currentQuerry = queryString.parse(params.toString());
            }

            const updatedQuerry: any = {
                ...currentQuerry,
                category: label,
            };

            const url = queryString.stringifyUrl(
                {
                    url: "/",
                    query: updatedQuerry,
                },
                {
                    skipNull: true,
                }
            );

            router.push(url);
        }
    }, [label, params, router]);

    return (
        <div
            onClick={handleCategoryChange}
            className={`flex items-center justify-center text-center gap-1 p-2 border-b-2
            hover:text-slate-800 transition cursor-pointer
    ${
        selected
            ? "border-b-slate-800 text-slate-800"
            : "border-transparent text-slate-500"
    }`}
        >
            <Icon size={20} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

export default Category;
