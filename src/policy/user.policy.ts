import Joi from 'joi'

// policy to validate get request for a client
const getUser = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

// policy to validate post request for a client
const addUser = {
    body: Joi.object().keys({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string()
            .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .required(),
        phone: Joi.number().greater(999999999).required(),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
            .required()
    })
};

// policy to validate put request for a client
const editUser = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    }),
    body: Joi.object().keys({
        firstname: Joi.string().min(3),
        lastname: Joi.string().min(3),
        phone: Joi.number().greater(999999999),
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .min(8)
    })
};

// policy to validate delete request for a client
const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

export default {
    getUser,
    addUser,
    editUser,
    deleteUser
}
