"use client";

import { PostInfo } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { LuArrowBigDown, LuArrowBigUp, LuBookmark, LuMessageSquare } from "react-icons/lu";

interface GalaxyPostsProps {
    galaxy: string;
    posts: PostInfo[];
    setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;
}

export default function GalaxyPosts({ galaxy, posts, setPosts }: GalaxyPostsProps) {
    useEffect(() => {
        axios.get(`/api/posts/${galaxy}`).then((res) => {
            setPosts(res.data);
        });
    }, [setPosts, galaxy]);

    return (
        <div className="flex flex-col mt-2 max-w-3xl">
            <div className="flex flex-col gap-4 my-4">
                {posts.length === 0 && (
                    <div className="flex flex-col gap-4">
                        <h1 className="text-primary-500 text-2xl">No posts yet!</h1>
                        <p className="text-gray-600 text-lg">Be the first one to create a post!</p>
                    </div>
                )}
                {posts.map((post) => {
                    return (
                        <div key={post.id} className="flex min-w-full items-center gap-4 bg-gray-100 p-4 rounded-lg">
                            <div className="flex flex-col">
                                <div className="flex gap-6">
                                    <div className="flex flex-col justify-center self-start">
                                        <div className="flex">
                                            <LuArrowBigUp className="w-6 h-6 text-gray-500 hover:fill-current hover:cursor-pointer" />
                                            <span className="text-gray-500 text-lg ml-1 font-semibold">{post._count.liked}</span>
                                        </div>
                                        <div className="flex">
                                            <LuArrowBigDown className="w-6 h-6 text-gray-500 hover:fill-current hover:cursor-pointer" />
                                            <span className="text-gray-500 text-lg ml-1 font-semibold">{post._count.disliked}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex">
                                            <Link href={`/g/${galaxy}/comments/${post.id}`} className="text-gray-600 font-semibold text-2xl hover:underline">
                                                {post.title}
                                            </Link>
                                            <span className="w-1 h-1 rounded-full bg-gray-600 self-center justify-self-center mx-2"></span>
                                            <span>
                                                <a href={`/a/${post.authorId}`} className="text-primary-500 hover:underline">
                                                    {post.authorId}
                                                </a>
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-lg">{post.content}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <div className="flex items-center">
                                        <LuMessageSquare className="w-6 h-6 text-gray-500 hover:fill-current hover:cursor-pointer" />
                                        <Link href={`/g/${galaxy}/comments/${post.id}`} className="text-gray-500 text-lg ml-2 font-semibold hover:underline">
                                            {post._count.comments} Comments
                                        </Link>
                                    </div>
                                    <div className="flex items-center">
                                        <LuBookmark className="w-6 h-6 text-gray-500 hover:fill-current hover:cursor-pointer" />
                                        <span className="text-gray-500 text-lg ml-1 font-semibold">{post._count.saved} Saved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
