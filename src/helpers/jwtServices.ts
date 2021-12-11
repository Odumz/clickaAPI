import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from './ApiError';
import { log } from 'console';

dotenv.config();

const { JWTSECRET, JWTEXPIRY } = process.env;
// console.log(JWTSECRET);

// console.log('lo');

// for the token creation and verification
// creates token for user
const createToken = async (data: any, expires: string = `${JWTEXPIRY}`) => {
    try {
        let token = jwt.sign(
            { data },
            `${JWTSECRET}`,
            { expiresIn: expires }
        );
        // console.log('expires here is: ', expires);
        return token;
    } catch (error) {
        // console.log(error.name);
        throw new ApiError(422, 'Could not create token.');
    }
}

// verify user token
const verifyToken = async (token: string) => {
    try {
        console.log('token is: ', token);
        console.log(`${JWTSECRET}`);
        
        const decodedToken = await jwt.verify(token, `${JWTSECRET}`);

        console.log('decoded token here is: ', decodedToken);
        
        return decodedToken;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

export {
    createToken,
    verifyToken
};
