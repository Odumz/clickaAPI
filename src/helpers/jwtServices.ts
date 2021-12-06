import * as jwt from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const { JWTSECRET, JWTEXPIRY } = process.env;
// console.log(JWTSECRET);

// console.log('lo');

// for the token creation and verification
class jwtServices {
    // creates token for user
    static async createToken(user: any) {
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
                JWTSECRET,
                { expiresIn: JWTEXPIRY }
            );
            // console.log(token);
            // return token
            return token;
        } catch (error) {
            // console.log(error.name);
            return errorRes(next, 422, 'Could not create token.');
        }
    }

    // verify user token
    static verifyToken(token: string) {
        try {
            let decodedToken = jwt.verify(token, JWTSECRET);
            // return decoded token
            return decodedToken;
        } catch (error) {
            // console.log(error);
            return null;
        }
    }
}

export default jwtServices;
