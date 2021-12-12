import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from './ApiError';

dotenv.config();

const { JWTSECRET, JWTEXPIRY } = process.env;

// for the token creation and verification
// creates token for user
const createToken = async (data: any, expires: string = `${JWTEXPIRY}`) => {
    try {
        let token = jwt.sign(
            { data },
            `${JWTSECRET}`,
            { expiresIn: expires }
        );
        return token;
    } catch (error) {
        throw new ApiError(422, 'Could not create token.');
    }
}

// verify user token
const verifyToken:any = async (token: string) => {
    try {        
        const decodedToken:any = await jwt.verify(token, `${JWTSECRET}`);
        
        return decodedToken;
    } catch (error) {
        throw new ApiError(401, 'Invalid token.');
    }
}

export {
    createToken,
    verifyToken
};
