"use client";

import { Galaxy } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface OwnedGalaxiesProps {
    galaxies: Galaxy[];
    setGalaxies: React.Dispatch<React.SetStateAction<Galaxy[]>>;
}

export default function OwnedGalaxies({ galaxies, setGalaxies }: OwnedGalaxiesProps) {
    useEffect(() => {
        axios.get("/api/galaxies/owned").then((res) => {
            setGalaxies(res.data);
        });
    }, [setGalaxies]);

    return (
        <div className="flex flex-col mt-2 max-w-lg">
            <h1 className="text-primary-500 text-2xl">Your galaxies</h1>
            <div className="flex flex-col gap-4 mt-4">
                {galaxies.map((galaxy) => {
                    return (
                        <div key={galaxy.id} className="flex items-center gap-4">
                            <Link href={`/g/${galaxy.name}`}>
                                <Image src={galaxy.image} width={50} height={50} alt="galaxy" />
                            </Link>
                            <div className="flex flex-col">
                                <Link href={`/g/${galaxy.name}`} className="text-primary-500 text-2xl hover:underline">
                                    {galaxy.name}
                                </Link>
                                <p className="text-gray-600 text-lg">{galaxy.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
