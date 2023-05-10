
import joi from 'joi'

export const theGamesSchema = joi.object ({

    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().required().positive(),
    pricePerDay: joi.number().required().positive(),

})