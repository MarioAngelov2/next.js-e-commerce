"use client";

import React from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    };

    return (
        <>
            <Heading title="Login" />
            <Button label="Continue with Google" outline onClick={() => {}} icon={AiOutlineGoogle} />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button
                label={isLoading ? "Loading" : "Login"}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                Don't have an account?
                <Link className="underline" href="/register">
                    {" "}
                    Sign Up
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
