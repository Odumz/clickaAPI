import IUser from '../interfaces/user';
import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true
        },
        lastname: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IUser>('user', UserSchema);
