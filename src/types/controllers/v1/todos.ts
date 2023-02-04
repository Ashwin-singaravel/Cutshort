import mongoose from "mongoose";
import { PageInfo } from "src/types/v1";

export interface Todo {
    title: string;
    completed?: boolean;
}

export interface CreateTodo extends Todo {
    user_id: mongoose.Types.ObjectId;
}

export interface ListTodos extends PageInfo{
    search?: string;
    completed?: boolean | string;
    created_by?: string;
}

export interface UpdateTodo extends CreateTodo {
    _id: mongoose.Types.ObjectId;
}