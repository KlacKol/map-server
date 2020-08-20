import Joi from '@hapi/joi';

export const ValidateMap = ({body}, res, next) => {
    const schema = Joi.object().keys({
        lat: Joi.number().greater(-90).less(90).required(),
        lng: Joi.number().greater(-180).less(180).required(),
        description: Joi.string().trim().min(20).max(200).required(),
        date: Joi.date().max('now').required(),
        userId: Joi.required()
    });

    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const result = schema.validate(body, _validationOptions);
    if (result.error) {
        const message = {
            status: 'failed',
            error: result.error.message
        };
        res.status(404).json(message);
    } else next();
};

export const ValidateUser = ({body}, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().trim().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
        password: Joi.string().trim().min(3).max(20).required(),
        name: Joi.string().trim().min(3).max(20).required(),
    });

    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const result = schema.validate(body, _validationOptions);
    if (result.error) {
        const message = {
            status: 'failed',
            error: result.error.message
        };
        res.status(404).json(message);
    } else next();
};

