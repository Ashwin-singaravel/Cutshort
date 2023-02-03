import mongoose, { Schema, Model, Document } from 'mongoose';
import { Password } from 'src/types';

export interface UserSensitiveDocument extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    encrypted_password: string;
    updated_at: Date;
    last_sign_in: Date;
}

export interface UserSensitiveModel extends Model<UserSensitiveDocument> {
    savePassword(password: Password): Promise<any>;
    signedIn(user_id: mongoose.Types.ObjectId): Promise<any>;
}

const UserSensitiveSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    user_id: {
        type: Schema.Types.ObjectId
    },
    encrypted_password: {
        type: String
    },
    updated_at: {
        type: Date
    },
    last_sign_in: {
        type: Date
    }
})

UserSensitiveSchema.statics.savePassword = async function (password: Password) {
    return this.updateOne({
        user_id: password.user_id
    }, {
        $set: {
            encrypted_password: password.encrypted_password,
            updated_at: new Date()
        }
    }, {
        upsert: true
    });
}

UserSensitiveSchema.statics.signedIn = async function (user_id: mongoose.Types.ObjectId) {
    return this.updateOne({
        user_id: user_id
    }, {
        $set: {
            last_sign_in: new Date()
        }
    })
}

export default mongoose.model<UserSensitiveDocument, UserSensitiveModel>('UsersSensitive', UserSensitiveSchema, 'users-sensitive');
