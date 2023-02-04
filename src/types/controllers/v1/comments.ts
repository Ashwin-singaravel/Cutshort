import mongoose from "mongoose";
import { PageInfo } from "src/types/v1";

export interface Comment {
    comment: string;
    post_id?: mongoose.Types.ObjectId;
}

export interface CreateComment extends Comment {
    user_id: mongoose.Types.ObjectId;
}

export interface ListComments extends PageInfo {
    search?: string;
    created_by?: string;
    post_id?: string;
}

export interface UpdateComment extends CreateComment {
    _id: mongoose.Types.ObjectId;
}