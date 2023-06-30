"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { IoLogoGithub } from "react-icons/io5";
import Button from "@/components/Button";

export default function Home() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/home");
        }
    }, [session, router]);

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
                    <div className="pl-28 mt-16">
                        <h1 className="text-primary-500 text-4xl">Atton, express yourself here</h1>
                        <p className="text-2xl max-w-xl text-gray-400">Your community-based platform to share your thoughts.</p>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-14">
                        <span className="text-2xl text-primary-500">Start exploring now!</span>
                        <div className="flex flex-col mt-2 gap-3 font-light">
                            <Link href="/login?type=register">
                                <Button size="px-36 h-16 text-2xl" primary>
                                    Create an account
                                </Button>
                            </Link>
                            <Link href="/login?type=login">
                                <Button size="px-36 h-16 text-2xl" secondary>
                                    Sign in to your account
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col mt-24 gap-4 items-center text-gray-500">
                        <a className="hover:text-black transition" href="https://github.com/abacaxiguy/atton">
                            <IoLogoGithub size={30} />
                        </a>
                        <p className="">Atton © 2023. All rights reserved</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
