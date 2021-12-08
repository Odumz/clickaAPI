import user from '../models/user'
import passportJwt from 'passport-jwt'
import { PassportStatic } from 'passport'
import { Request } from 'express'
import dotenv from 'dotenv';

dotenv.config();

const { JWTSECRET } = process.env;

const { Strategy } = passportJwt;

const cookieExtractor:any = (req: Request): Promise<any> => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies?.jwt;
    }
    
    return jwt;
};

const optionsCookie:any = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWTSECRET
};

export default (passport: PassportStatic) => {
    passport.use(
        new Strategy(optionsCookie, async (payload: any, done: any): Promise<any> => {
            await user
                .findById(payload.id)
                .then((user) => {
                    user ? done(null, user) : done(null, false);
                })
                .catch(() => done(null, false));
        })
    );
};