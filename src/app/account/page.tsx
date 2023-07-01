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

export default function Account() {
    const [galaxies, setGalaxies] = useState<Galaxy[]>([]);

    useEffect(() => {
        axios.get("/api/galaxies/owned").then((res) => {
            setGalaxies(res.data);
        });
    }, []);

    const { handleSubmit, register, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            image: "/images/galaxies/galaxy-purple.svg",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
                        <Image src="/images/galaxies/galaxy-purple.svg" width={50} height={50} alt="galaxy" />
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

                    <div className="flex flex-col mt-8">
                        <h1 className="text-primary-500 text-2xl">Your galaxies</h1>
                        <div className="flex flex-col gap-4 mt-4">
                            {galaxies.map((galaxy) => {
                                return (
                                    <div key={galaxy.id} className="flex items-center gap-4">
                                        <Image src={galaxy.image || "/images/galaxy-purple.svg"} width={50} height={50} alt="galaxy" />
                                        <div className="flex flex-col">
                                            <h1 className="text-primary-500 text-2xl">{galaxy.name}</h1>
                                            <p className="text-gray-600 text-lg">{galaxy.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
