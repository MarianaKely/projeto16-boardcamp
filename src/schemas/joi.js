
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


const theClientsSchema = Joi.object({

  name: Joi.string().required().empty().messages({
    "any.required": "Obrigatório preencher o campo 'nome'.",
    "string.empty": "O campo 'nome' não pode estar vazio.",

  }),

  phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/).required().messages({

      "any.required": "Obrigatório preencher o campo 'telefone'.",
      "string.base": "Por favor preencha com uma frase válida.",
      "string.empty": "Por favor preencha.",
      "string.length": "Por favor preencha com 10 ou 11 caracteres.",
      "string.pattern.base":"Por favor preencha apenas com dígitos numéricos.",

    }),

  cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required().messages({

      "any.required": "Obrigatório preencher o campo 'cpf'.",
      "string.base": "Por favor preencha com uma frase válida.",
      "string.empty": "Por favor preencha.",
      "string.length": "Por favor preencha com 11 caracteres.",
      "string.pattern.base":"Por favor preencha apenas com dígitos numéricos.",

    }),

  birthday: Joi.date().required().messages({

    "any.required": "Obrigatório preencher 'data de nascimento' ",
    "date.base": "Por favor preencha uma data válida.",

  }),

});


export default {theGamesSchema , theClientsSchema};