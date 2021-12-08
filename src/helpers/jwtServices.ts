import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from './ApiError';

dotenv.config();

const { JWTSECRET, JWTEXPIRY } = process.env;
// console.log(JWTSECRET);

// console.log('lo');

// for the token creation and verification
// creates token for user
const createToken = async (user: any, expires: string = `${JWTEXPIRY}`) => {
    try {
        let token = jwt.sign(
            {
                id: user._id,
                phone: user.phone,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                role: user.role
            },
            `${JWTSECRET}`,
            { expiresIn: expires }
        );
        // console.log('token here is: ', token);
        return token;
    } catch (error) {
        // console.log(error.name);
        throw new ApiError(422, 'Could not create token.');
    }
}

// verify user token
const verifyToken = async (token: string) => {
    try {
        let decodedToken = jwt.verify(token, `${JWTSECRET}`);
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
