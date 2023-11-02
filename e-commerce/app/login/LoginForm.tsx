"use client";

import React from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
    const router = useRouter();
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

        signIn("credentials", {
            ...data,
            callbackUrl: "/",
        }).then((res) => {
            setIsLoading(false);

            if (res?.ok) {
                router.push("/");
                router.refresh();
                toast.success("Logged in successfully");
            }

            if (res?.error) {
                toast.error("Something went wrong. Please try again.");
                console.log(res.error);
            }
        });
    };

    return (
        <>
            <Heading title="Login" />
            <Button
                label="Continue with Google"
                outline
                onClick={() => {}}
                icon={AiOutlineGoogle}
            />
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
