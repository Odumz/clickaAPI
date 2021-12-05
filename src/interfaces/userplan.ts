import { Document } from 'mongoose';

export default interface IUserPlan extends Document {
    name: string;
    features: Array<''>;
    price: number;
}
