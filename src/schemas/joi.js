
import Joi from "joi";

const theGamesSchema = Joi.object({

  name: Joi.string().required().empty().messages({

    "any.required": "Obrigatório preencher o campo 'nome'.",
    "string.empty": "O campo 'nome' não pode estar vazio.",

  }),

  image: Joi.string().required().empty().messages({

    "any.required": "Obrigatório preencher o campo 'imagem'.",
    "string.empty": "O campo 'imagem' não pode estar vazio."

  }),

  stockTotal: Joi.number().min(1).required().messages({

    "any.required": "Obrigatório preencher o campo 'estoque'.",
    "number.min": "O campo 'estoque' deve ser maior que 0.",

  }),

  pricePerDay: Joi.number().min(1).required().messages({

    "any.required": "Obrigatório preencher o campo 'preço por dia'.",
    "number.min": "O campo 'preço por dia' deve ser maior que 0.",

  })
  
});


export default theGamesSchema;