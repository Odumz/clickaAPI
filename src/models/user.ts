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
            minLength: 8
        },
        role: {
            type: String,
            enum: ['admin', 'clickar'],
            default: 'clickar'
        },
        isClickar: {
            type: Boolean,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: 0
        },
        isVerified: {
            type: Boolean,
            default: 0
        },
        profileImage: {
            type: String,
            minLength: 14
        },
        plan: {
            type: Schema.Types.ObjectId,
            ref: 'userplan'
        },
        isPushNotificationActive: {
            type: Boolean,
            default: 0
        },
        token: {
            type: String,
            minLength: 35
        },
        isSubscribed: {
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export default model<IUser>('user', UserSchema);
