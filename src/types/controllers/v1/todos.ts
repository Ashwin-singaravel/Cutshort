import mongoose from "mongoose";

export interface Todo {
    title: string;
    completed?: boolean;
}

export interface CreateTodo extends Todo {
    _id?: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
}

export interface UpdateTodo extends CreateTodo {}