import db from '../../db'
import {NotFoundError} from "elysia";

// GET All Posts
export async function getPosts() {
    try {
        return await db.post.findMany({ orderBy: { createdAt: 'asc' } });
    }
    catch (error:unknown) {
        console.error('error getting posts list', error);
    }
}
// Get Post by ID
export async function getPost(id: number) {
    try {
        const post = await db.post.findUnique({where: { id }});

        if(!post) {
            throw new NotFoundError('post not found');
        }
        return post;
    }
    catch (error:unknown) {
        console.error('error getting post', error);
    }
}
// Create Post
export async function createPost(options: {title: string; content: string}) {
    try {
        const {title, content} = options;
        return await db.post.create({data: {title, content}});
    }catch (error:unknown) {
        console.error('error creating post', error);
    }
}
// Update Post
export async function updatePost(id: number, options: {title?: string; content?: string}) {
    try {
        const{ title, content} = options;
        return await db.post.update({
            where: {id},
            data: {
                ...(title ? { title} : {}),
                ...(content ? { content} : {}),
            }
        })

    }
    catch (error:unknown) {
        console.error('error updating post', error);
    }
}
// Delete Post
export async function deletePost(options: {id: number}) {
    try {
        const {id} = options;
        return await db.post.delete({where: {id}});
    }
    catch (error:unknown) {
        console.error('error deleting post', error);
    }
}