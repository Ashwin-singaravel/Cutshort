import mongoose, { Schema, Model, Document, Date } from 'mongoose';
import { SignUp } from 'src/types';

export interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    updated_at: Date;
}

export interface UserModel extends Model<UserDocument> {
    saveUserData(query: SignUp): Promise<UserDocument>;
}

const UserSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    updated_at: {
        type: Date
    }
}, { versionKey: false })

UserSchema.statics.saveUserData = async function (query: SignUp) {
    return this.findOneAndUpdate({
        email: query.email
    }, {
        ...query,
        updated_at: new Date()
    }, {
        upsert: true, new: true,
        projection: {
            email: 1,
            username: 1
        }
    });
}

export default mongoose.model<UserDocument, UserModel>('Users', UserSchema, 'users');
