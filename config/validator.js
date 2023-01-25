const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({ //method that contains all of the data that I need to validate
        email: joi.string()
            .email({minDomainSegments: 2})
            .required()
            .messages({
                'string.email' : '"mail": incorrect format'}),
        firstName: joi.string()
            .required(),
        password: joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'}),
        role: joi.string()
            .required(),
        from: joi.string()
            .required(),
        country: joi.string()
            .required(),
        urlImage: joi.string()
            .required(),
        lastName: joi.any()
                
    })
    const validation = schema.validate( req.body.userData, { abortEarly: false })
    if(validation.error){
        return res.json({ success: false, from: 'validator', message: validation.error.details, test: validation })
    }
    next()
}
module.exports = validator