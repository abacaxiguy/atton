import prisma from "@/libs/prisma";

export default async function getCurrentGalaxy(galaxy: string) {
    try {
        const currentGalaxy = await prisma.galaxy.findUnique({
            where: {
                name: galaxy,
            },
        });

        if (!currentGalaxy) return null;

        return currentGalaxy;
    } catch (error: any) {
        return null;
    }
}
