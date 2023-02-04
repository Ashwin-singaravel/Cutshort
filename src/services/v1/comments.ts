import mongoose from 'mongoose';
import Comments from 'src/model/v1/ comments';
import { Comment, ListComments } from "src/types"

export const createComment = async (body: Comment, userId: string) => {
    
    if (body.comment == undefined || body.comment.length == 0 || body.post_id == undefined || !mongoose.isValidObjectId(body.post_id)) {
        throw 1002;
    }

    const comment: any = (await Comments.createComment({
        ...body,
        user_id: userId
    })).toObject();

    delete comment.__v;
    delete comment.updated_at;

    return comment;
}

export const readComment = async (_id: string) => {

    if (!mongoose.isValidObjectId(_id)) {
        throw 1002;
    }

    const comment = await Comments.readComment(_id);

    if (comment.length == 0) {
        throw 1504;
    }

    return comment[0];
}

export const listComments = async (listParams: ListComments) => {
    const comments = await Comments.listComments(listParams);
    return comments;
}

export const updateComment = async (body: Comment, userId: string, _id: string) => {
    
    if (body.comment == undefined || body.comment.length == 0 || !mongoose.isValidObjectId(_id) ) {
        throw 1002;
    }

    const update = await Comments.updateComment({
        ...body,
        _id: _id,
        user_id: userId
    })

    if (update.nModified < 1) {
        throw await Comments.findById(_id) ? 1505 : 1504;
    }

    return await readComment(_id);
}

export const deleteComment = async (_id: string, user_id: string) => {

    if (!mongoose.isValidObjectId(_id)) {
        throw 1002;
    }
    
    if ((await Comments.deleteOne({ _id: _id, user_id: user_id })).deletedCount == 0) {        
        throw await Comments.findById(_id) ? 1505 : 1508;
    }

}