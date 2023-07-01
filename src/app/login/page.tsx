"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Login() {
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const [formType, setFormType] = useState<"login" | "register">(type === "login" ? "login" : "register");

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/home");
        }
    });

    const { handleSubmit, register } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (formType === "login") {
            if (data.email === "" || data.password === "") {
                return toast.error("Please fill all the fields");
            }

            signIn("credentials", {
                ...data,
                redirect: false,
            }).then((callback) => {
                if (callback?.error) return toast.error(callback.error);
                if (callback?.ok) {
                    toast.success("Logged in successfully");
                }
            });
        } else if (formType === "register") {
            if (data.email === "" || data.password === "" || data.username === "") {
                return toast.error("Please fill all the fields");
            }
            axios
                .post("/api/register", data)
                .then(() => {
                    toast.success("Account created successfully");
                    signIn("credentials", {
                        ...data,
                        redirect: false,
                    });
                })
                .catch((err) => {
                    toast.error(err.response.data);
                });
        }
    };

    return (
        <main className="flex min-h-screen overflow-hidden">
            <div className="flex-1 relative">
                <div className="w-full h-full bg-primary-500 opacity-[0.15] absolute top-0 left-0 z-10" />
                <Image src="/images/home-hero.jpg" alt="Milky way by Miriam Espacio" className="object-right object-cover w-full h-full" width={1920} height={1079} quality={100} />
            </div>
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
                                <Button type="submit" size="px-36 h-12 text-xl" primary>
                                    {formType === "login" ? "Sign in" : "Sign up"}{" "}
                                </Button>

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
        </main>
    );
}
