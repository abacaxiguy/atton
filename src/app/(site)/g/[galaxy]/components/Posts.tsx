"use client";

import { useState } from "react";

import GalaxyPosts from "./GalaxyPosts";
import NewPost from "./NewPost";
import Link from "next/link";
import { PostInfo } from "@/types";

interface PostsProps {
    galaxy: string;
    userId: string | undefined;
}

export default function Posts({ galaxy, userId }: PostsProps) {
    const [posts, setPosts] = useState<PostInfo[]>([]);

    if (!userId)
        return (
            <>
                <div className="flex flex-col mt-12 max-w-xl gap-3">
                    <h1 className="text-primary-500 text-2xl">
                        You need to be logged in to create a post!{" "}
                        <Link className="text-primary-500 underline" href="/login?type=login">
                            Login
                        </Link>
                    </h1>
                </div>
                <GalaxyPosts galaxy={galaxy} posts={posts} setPosts={setPosts} />
            </>
        );

    return (
        <>
            <NewPost galaxy={galaxy} setPosts={setPosts} />
            <GalaxyPosts galaxy={galaxy} posts={posts} setPosts={setPosts} />
        </>
    );
}
