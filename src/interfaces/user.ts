import { Document } from 'mongoose';

export default interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
}
