import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const env:string = process.env.NODE_ENV || 'dev';

const MONGO_OPTIONS:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    retryWrites: false,
    socketTimeoutMS: 30000
};

let MONGO_URI:string;

if (env === 'test') {
    MONGO_URI = process.env.TEST_MONGO_URI!;
} else {
    MONGO_URI = process.env.MONGO_URI!;
}

const MONGO:any = {
    mongoUri: MONGO_URI,
    options: MONGO_OPTIONS
};

const PORT:number = parseInt(process.env.PORT!);

const SERVER:any = {
    port: PORT,
    mongo: MONGO_URI
};

export const config:any = {
    mongo: MONGO,
    server: SERVER
};

export const NODEMAILER_USER = process.env.NODEMAILER_USER;

export const NODEMAILER_PWD = process.env.NODEMAILER_PWD;

const mailerAccount:any = nodemailer.createTestAccount();

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for others
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PWD
    }
});

export const FRONTENDURL = process.env.FRONTENDURL;
