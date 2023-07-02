import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface IParams {
    galaxy?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
    try {
        const { galaxy } = params;

        const posts = await prisma.post.findMany({
            where: {
                galaxy: {
                    name: galaxy,
                },
            },
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                content: true,
                images: true,
                _count: {
                    select: {
                        comments: true,
                        liked: true,
                        disliked: true,
                        saved: true,
                    },
                },
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const body = await request.json();
        const user = await getCurrentUser();

        const { galaxy } = params;

        if (!user) {
            return new NextResponse("Invalid request", {
                status: 400,
            });
        }

        const galaxyId = await prisma.galaxy.findUnique({
            where: {
                name: galaxy,
            },
            select: {
                id: true,
            },
        });

        if (!galaxyId) {
            return new NextResponse("Invalid request", {
                status: 400,
            });
        }

        const { title, content, images } = body;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                images,
                galaxyId: galaxyId.id,
                authorId: user.id,
            },
            include: {
                galaxy: true,
                author: true,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}
