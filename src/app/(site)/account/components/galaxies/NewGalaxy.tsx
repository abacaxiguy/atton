"use client";

import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoCreate } from "react-icons/io5";

import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Galaxy } from "@prisma/client";

interface NewGalaxyProps {
    setGalaxies: React.Dispatch<React.SetStateAction<Galaxy[]>>;
}

export default function NewGalaxy({ setGalaxies }: NewGalaxyProps) {
    const defaultImages = ["/images/galaxies/galaxy-cyan.svg", "/images/galaxies/galaxy-orange.svg", "/images/galaxies/galaxy-purple.svg", "/images/galaxies/galaxy-red.svg"];

    const { handleSubmit, register, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            image: defaultImages[Math.floor(Math.random() * defaultImages.length)],
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!data.name || !data.description) return toast.error("Please enter a name");

        if (data.name.includes(" ")) return toast.error("Galaxy name cannot contain spaces");

        axios
            .post("/api/galaxies/owned", data)
            .then(() => {
                setValue("name", "");
                setValue("description", "");
                toast.success("Galaxy created!");
                axios.get("/api/galaxies/owned").then((res) => {
                    setGalaxies(res.data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main className="flex px-28">
            <div className="">
                <div className="flex flex-col">
                    <div className="flex items-center gap-6 mb-4">
                        <Image src="/images/galaxies/galaxy-orange.svg" width={50} height={50} alt="galaxy" />
                        <h1 className="text-primary-500 text-2xl">Create a galaxy</h1>
                    </div>

                    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                        <Input id="name" label="Name" register={register} />
                        <Input id="description" label="Description" register={register} />
                        <Button type="submit" size="py-3 mt-4 flex items-center flex-row text-2xl justify-center" primary>
                            Create
                            <IoCreate className="text-white text-3xl ml-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
