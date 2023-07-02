"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LuPlus, LuX } from "react-icons/lu";
import { PostInfo } from "@/types";

interface NewPostProps {
    galaxy: string;
    setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;
}

export default function NewPost({ galaxy, setPosts }: NewPostProps) {
    const { handleSubmit, register, setValue } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            content: "",
            galaxy: galaxy,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!data.title || !data.content) return toast.error("Please fill all the fields");

        axios
            .post(`/api/posts/${galaxy}`, data)
            .then(() => {
                setValue("title", "");
                setValue("content", "");
                toast.success("Post created!");
                axios.get(`/api/posts/${galaxy}`).then((res) => {
                    setPosts(res.data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col mt-12 max-w-3xl gap-3 bg-gray-100 rounded-lg p-6">
            <h2 className="text-gray-500 text-3xl font-medium">Create a post!</h2>
            <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    id="title"
                    className="w-full rounded-t border-2 outline-none border-b-0 border-gray-400/40 p-2 text-gray-400"
                    required
                    {...register("title", { required: true })}
                    placeholder="Title"
                />
                <textarea
                    rows={4}
                    id="content"
                    className="w-full outline-none p-2 text-gray-400 rounded-b border-2 border-gray-400/40 resize-none"
                    placeholder="Content"
                    required
                    {...register("content", { required: true })}
                ></textarea>
                <div className="flex text-white mt-2 gap-4">
                    <button type="button" className="items-center justify-center flex w-full bg-rose-500/95 hover:bg-rose-500 transition rounded-md py-1">
                        <LuX className="w-8 h-8" />
                    </button>
                    <button type="submit" className="items-center justify-center flex w-full bg-primary-500/95 hover:bg-primary-500 transition rounded-md py-1">
                        <LuPlus className="w-8 h-8" />
                    </button>
                </div>
            </form>
        </div>
    );
}
