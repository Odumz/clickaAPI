// import { NextFunction } from 'express';
// import ApiError from '../helpers/ApiError';
// import { verifyToken } from '../helpers/jwtServices'
// class Auth {
//     static async authenticateUser(req:Request, res:Response, next:NextFunction) {
//         if (!req.headers) {
//             throw new ApiError(401, 'The authorization header is required');
//         }

//         let splitHeader = req.headers.authorization.split(' '); // error with req.bearers....
//         // console.log(splitHeader);
//         if (splitHeader[0] !== 'Bearer') {
//             throw new ApiError(401, 'wrong authorization format used...bearer <token> expected</token>');
//         }

//         let token = splitHeader[1];
//         // console.log(token)

//         let decodedToken = verifyToken(token);

//         if (!decodedToken) {
//             throw new ApiError(401, 'user not found');
//         }

//         // console.log("dectoken:", decodedToken)
//         req.user = decodedToken; // error with req.user
//         // console.log("req.user", req.user);
//         next();
//         // return decodedToken
//     }

//     static async isAdminUser(req:Request, res:Response, next:NextFunction) {
//         if (req.user.role !== 'admin') {  // error with req.user
//             throw new ApiError(401, 'this route is restricted to admin users');
//         }
//         return next();
//     }

//     static async isInvestor(req:Request, res:Response, next:NextFunction) {
//         // console.log(req.user);
//         let userRole = req.user.role; // error with req.user
//         // console.log(userRole);
//         if (req.user.role !== 'investor') { // error with req.user
//             if (req.user.role !== 'admin') { // error with req.user
//                 throw new ApiError(401, 'you are not allowed on this route');
//             }
//         }
//         return next();
//     }
// }

// module.exports = Auth;
