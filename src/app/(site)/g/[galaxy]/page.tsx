import getCurrentGalaxy from "@/actions/getCurrentGalaxy";
import Image from "next/image";

import Posts from "./components/Posts";
import getCurrentUser from "@/actions/getCurrentUser";

interface GalaxyIdProps {
    params: {
        galaxy: string;
    };
}

export default async function GalaxyId({ params }: GalaxyIdProps) {
    const currentGalaxy = await getCurrentGalaxy(params.galaxy);
    const currentUser = await getCurrentUser();

    if (!currentGalaxy?.id) return <h1>Galaxy not found</h1>;

    return (
        <div className="flex flex-col px-56">
            <div className="flex items-center gap-3">
                <Image src={currentGalaxy.image} width={60} height={60} alt={`${currentGalaxy.name}'s image`} />
                <h1 className="text-4xl text-primary-500">{currentGalaxy.name}</h1>
            </div>
            <Posts galaxy={currentGalaxy.name} userId={currentUser?.id} />
        </div>
    );
}
