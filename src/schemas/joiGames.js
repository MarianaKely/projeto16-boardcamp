
import Joi from "joi";

const theGamesSchema = Joi.object({

  name: Joi.string().required().empty().messages({

    "any.required": "Obrigatório preencher o campo 'nome'.",
    "string.empty": "Por favor preencha",

  }),

  image: Joi.string().required().empty().messages({

    "any.required": "Obrigatório preencher o campo 'imagem'.",
    "string.empty": "Por favor preencha."

  }),

  stockTotal: Joi.number().min(1).required().messages({

    "any.required": "Obrigatório preencher o campo 'estoque'.",
    "number.min": "Por favor preencha, não pode ser 0.",

  }),

  pricePerDay: Joi.number().min(1).required().messages({

    "any.required": "Obrigatório preencher o campo 'preço por dia'.",
    "number.min": "Por favor preencha, não pode ser 0.",

  })
  
});


export default theGamesSchema;