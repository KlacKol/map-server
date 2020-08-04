import Joi from '@hapi/joi';

export const Validator = ({body}, res, next) => {
    const schema = Joi.object().keys({
        lat: Joi.number().precision(8).required(),
        lng: Joi.number().precision(8).required(),
        description: Joi.string().min(20).max(200),
        date: Joi.date().required(),
    });

    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const result = schema.validate(body, _validationOptions)
    console.log(result)
    console.log('//////////////')
    console.log(result.error.message);
    if (result.error) {
        const eo = {
            status: 'failed',
            error: result.error.message
        };
        res.status(404).json(eo);
    }
    next();
}