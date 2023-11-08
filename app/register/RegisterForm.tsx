"use client";

import React, { useEffect } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoggedInUser } from "@/types";

interface RegisterFormProps {
    user: LoggedInUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ user }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Account created successfully");

                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                }).then((callback) => {
                    if (callback?.ok) {
                        router.push("/cart");
                        router.refresh();
                        toast.success("Logged in successfully");
                    }

                    if (callback?.error) {
                        toast.error("Error logging in");
                        console.log(callback.error);
                    }
                });
            })
            .catch((err) => {
                toast.error("Error creating account");
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (user) {
        return <p className="text-center">Logged in. Redirecting...</p>
    }

    return (
        <>
            <Heading title="Sign Up" />
            <Button
                label="Sign up with Google"
                outline
                onClick={() => {}}
                icon={AiOutlineGoogle}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
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
                label={isLoading ? "Loading" : "Sign Up"}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                Already have an accound?
                <Link className="underline" href="/login">
                    {" "}
                    Login
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
