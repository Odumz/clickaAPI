import Joi from 'joi';

// policy to validate get request for a client
const loginValidator = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
            .required()
    })
};

// policy to validate post request for a client
const registrationValidator = {
    body: Joi.object().keys({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().greater(999999999).required(),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
            .required(),
        role: Joi.string().valid('admin', 'clickar').required()
    })
};

// policy to validate put request for a client
const forgotPasswordValidator = {
    body: Joi.object().keys({
        email: Joi.string().email().required()
    })
};

const changePasswordValidator = {
    body: Joi.object().keys({
        email: Joi.string().email().required()
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
