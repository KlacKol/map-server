import Joi from '@hapi/joi';

export const Validator = ({body}, res, next) => {
    const schema = Joi.object().keys({
        lat: Joi.number().greater(-90).less(90).required(),
        lng: Joi.number().greater(-180).less(180).required(),
        description: Joi.string().min(20).max(200),
        date: Joi.date().max('now').required(),
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