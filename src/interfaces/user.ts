import { Document } from 'mongoose';

export default interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
    role: string;
    plan: string;
    isVerified: boolean;
    isClickar: boolean;
    isAdmin: boolean;
    profileImage: string;
    isPushNotificationActive: boolean;
    isSubscribed: boolean;
    passwordResetToken: string;
    passwordResetExpiry: string;
}
