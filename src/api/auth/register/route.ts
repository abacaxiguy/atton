import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/libs/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { username, email, password } = body;

        if (!username || !email || !password) return new Response("There are missing fields", { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        console.error("REGISTER_ERROR:", error);
        return new NextResponse("Server error, please try again", { status: 500 });
    }
}
