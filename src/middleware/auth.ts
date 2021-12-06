class Auth {
    static async authenticateUser(req, res, next) {
        if (!req.headers.authorization) {
            return errorRes(next, 401, 'The authorization header is required');
        }

        let splitHeader = req.headers.authorization.split(' ');
        // console.log(splitHeader);
        if (splitHeader[0] !== 'Bearer') {
            return errorRes(next, 401, 'wrong authorization format used...bearer <token> expected</token>');
        }

        let token = splitHeader[1];
        // console.log(token)

        let decodedToken = verifyToken(token);

        if (!decodedToken) {
            return errorRes(next, 401, 'user not found');
        }

        // console.log("dectoken:", decodedToken)
        req.user = decodedToken;
        // console.log("req.user", req.user);
        next();
        // return decodedToken
    }

    static async isAdminUser(req, res, next) {
        if (req.user.role !== 'admin') {
            return rerrorRes(next, 401, 'this route is restricted to admin users');
        }
        return next();
    }

    static async isInvestor(req, res, next) {
        // console.log(req.user);
        let userRole = req.user.role;
        // console.log(userRole);
        if (req.user.role !== 'investor') {
            if (req.user.role !== 'admin') {
                return errorRes(next, 401, 'you are not allowed on this route');
            }
        }
        return next();
    }
}

module.exports = Auth;
