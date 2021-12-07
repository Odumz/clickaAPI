import Joi from 'joi';

// policy to validate login request for a user
const loginValidator = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
            .required()
    })
};

// policy to validate registration request for a user
const registrationValidator = {
    body: Joi.object().keys({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().greater(999999999).required(),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
            .required()
    })
};

// policy to validate email for forgot password request for a user
const forgotPasswordValidator = {
    body: Joi.object().keys({
        email: Joi.string().email().required()
    })
};

// policy to validate password for change password request for a user
const changePasswordValidator = {
    body: Joi.object().keys({
        passwordResetToken: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(35)
            .required(),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
            .required()
    })
};

// policy to validate delete request for a client
const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

export {
    loginValidator,
    registrationValidator,
    forgotPasswordValidator,
    changePasswordValidator,
    deleteUser
};
