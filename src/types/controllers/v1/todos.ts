import mongoose from "mongoose";
import { PageInfo } from "src/types/v1";

export interface Todo {
    title: string;
    completed?: boolean;
}

export interface CreateTodo extends Todo {
    _id?: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
}

export interface ListTodos extends PageInfo{
    search?: string;
}

export interface UpdateTodo extends CreateTodo {}