import prisma from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, description, image } = body;

        const user = await getCurrentUser();

        if (!user?.email || !user?.id) return new Response("You must be logged in to create a galaxy", { status: 401 });

        if (!name || !description || !image) return new Response("There are missing fields", { status: 400 });

        const galaxy = await prisma.galaxy.create({
            data: {
                name,
                description,
                image,
                owner: {
                    connect: {
                        id: user.id,
                    },
                },
            },
            include: {
                owner: true,
            },
        });

        return NextResponse.json(galaxy, { status: 201 });
    } catch (error: any) {
        return new NextResponse("Server error, please try again", { status: 500 });
    }
}

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user?.email || !user?.id) return new Response("You must be logged in to create a galaxy", { status: 401 });

        const galaxies = await prisma.galaxy.findMany({
            where: {
                ownerId: user.id,
            },
            include: {
                owner: true,
            },
        });

        return NextResponse.json(galaxies, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Server error, please try again", { status: 500 });
    }
}
