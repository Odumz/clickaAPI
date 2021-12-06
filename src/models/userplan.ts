import IUserPlan from '../interfaces/userplan';
import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

const UserPlanSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            minLength: 4,
            required: true
        },
        features: {
            type: Array,
            required: true
        },
        price: {
            type: Number,
            min: 2,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IUserPlan>('userplan', UserPlanSchema);
