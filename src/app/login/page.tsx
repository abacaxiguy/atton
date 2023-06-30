"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Login() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    const [formType, setFormType] = useState<"login" | "register">(type === "login" ? "login" : "register");

    const { handleSubmit, register } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div className="flex-1 animate-fade-up">
            <div className="py-2 flex flex-col">
                <div className="flex justify-center items-center">
                    <Link href="/">
                        <Image className="mt-16" src="/logo.svg" alt="Atton" width={300} height={100} />
                    </Link>
                </div>
                <div className="mt-28 flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-primary-500">{formType === "login" ? "Sign in into your account" : "Create your Atton account"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
                        <div className="flex flex-col mt-8 gap-4">
                            {formType === "register" && <Input id="username" label="Username" register={register} />}

                            <Input id="email" label="Email" type="email" register={register} />
                            <Input id="password" label="Password" type="password" register={register} />
                            <Button text="Login" size="px-36 h-12 text-xl" primary />

                            <div className="flex justify-center items-center">
                                <span className="text-gray-400">{formType === "login" ? "Don't have an account?" : "Already have an account?"}</span>
                                <button className="text-primary-500 hover:text-primary-400 transition ml-2" type="button" onClick={() => setFormType(formType === "login" ? "register" : "login")}>
                                    {formType === "login" ? "Create one" : "Sign in"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
