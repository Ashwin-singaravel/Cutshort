import mongoose from "mongoose";
import { PageInfo } from "src/types/v1";

export interface Post {
    title: string;
}

export interface CreatePost extends Post {
    _id?: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
}

export interface ListPosts extends PageInfo {
    search?: string;
    created_by?: string;
}

export interface UpdatePost extends CreatePost { }