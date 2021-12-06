import Joi from 'joi'

// policy to validate get request for a client
const getUserPlan = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

// policy to validate post request for a client
const addUserPlan = {
    body: Joi.object().keys({
        name: Joi.string().min(4).required(),
        features: Joi.array().required(),
        price: Joi.number().greater(9).required()
    })
};

// policy to validate put request for a client
const editUserPlan = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().min(4),
        features: Joi.array(),
        price: Joi.number().greater(9)
    })
};

// policy to validate delete request for a client
const deleteUserPlan = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

export default {
    getUserPlan,
    addUserPlan,
    editUserPlan,
    deleteUserPlan
}
