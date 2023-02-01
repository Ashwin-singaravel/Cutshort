import mongoose from "mongoose";

export interface Password {
    user_id: mongoose.Types.ObjectId;
    encrypted_password?: string;
}

export interface SignIn {
    id?: string;
    email: string;
    password: string;
}

export interface SignUp extends SignIn {
    username: string;
}