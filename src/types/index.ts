import { Post } from "@prisma/client";

export type PostInfo = Post & {
    _count: {
        comments: number;
        liked: number;
        disliked: number;
        saved: number;
    };
};
