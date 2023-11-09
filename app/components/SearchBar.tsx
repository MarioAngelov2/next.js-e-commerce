"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
    const [openInput, setOpenInput] = useState<boolean>(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push("/");

        const url = queryString.stringifyUrl(
            {
                url: "/",
                query: { searchTerm: data.searchTerm },
            },
            { skipNull: true }
        );

        router.push(url);
        reset();
    };

    const handleSearchInput = () => {
        setOpenInput((prev) => !prev);
    };

    return (
        <div className="flex flex-row items-center gap-2">
            <input
                {...register("searchTerm")}
                autoComplete="off"
                type="text"
                placeholder="Explore products"
                className="p-2 border rounded-md md:w-80 outline-none 
                hover:shadow-md focus:shadow-md shadow-gray-100 transition 
                duration-200 ease-in-out"
            />
            <button
                onClick={handleSubmit(onSubmit)}
                className="bg-slate-700 text-white p-2 rounded-md 
                hover:opacity-80 transition duration-200 ease-in-out"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
