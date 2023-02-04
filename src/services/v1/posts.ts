import mongoose from 'mongoose';
import Posts from 'src/model/v1/posts';
import { ListPosts, Post } from 'src/types/controllers/v1/posts';

export const createPost = async (body: Post, userId: string) => {

    if (body.title == undefined || body.title.length == 0) {
        throw 1002;
    }

    const post: any = (await Posts.creatPost({
        ...body,
        user_id: userId
    })).toObject();

    delete post.__v;
    delete post.updated_at;

    return post;
}

export const readPost = async (_id: string) => {
    
    if (!mongoose.isValidObjectId(_id)) {
        throw 1002;
    }

    const post = await Posts.readPost(_id);
    
    if (post.length == 0) {
        throw 1404;
    }

    return post[0];
}

export const listPosts = async (listParams: ListPosts) => {
    const posts = await Posts.listPosts(listParams)
    return posts;
}

export const updatePost = async (body: Post, userId: string, _id: string) => {

    if (body.title == undefined || body.title.length == 0 || !mongoose.isValidObjectId(_id)) {
        throw 1002;
    }

    const update = await Posts.updatePost({
        ...body,
        user_id: userId,
        _id: _id
    })

    if (update.nModified < 1) {
        throw await Posts.findById(_id) ? 1405 : 1404;
    }

    return await readPost(_id);

}

export const deletePost = async (_id: string, user_id: string) => {

    if (!mongoose.isValidObjectId(_id)) {
        throw 1002;
    }
    
    if ((await Posts.deleteOne({ _id: _id, user_id: user_id })).deletedCount == 0) {        
        throw await Posts.findById(_id) ? 1405 : 1408;
    }

}