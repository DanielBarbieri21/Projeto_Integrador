const Joi = require('joi');

/**
 * Schemas de validação Joi
 */
const authSchemas = {
  // Validação de registro
  register: Joi.object({
    nome: Joi.string()
      .min(3)
      .max(120)
      .required()
      .messages({
        'string.empty': 'Nome é obrigatório',
        'string.min': 'Nome deve ter no mínimo 3 caracteres',
        'string.max': 'Nome não pode exceder 120 caracteres',
      }),
    email: Joi.string()
      .email()
      .required()
      .lowercase()
      .messages({
        'string.email': 'E-mail inválido',
        'string.empty': 'E-mail é obrigatório',
      }),
    senha: Joi.string()
      .min(8)
      .max(128)
      .required()
      .pattern(/[a-z]/)
      .pattern(/[A-Z]/)
      .pattern(/[0-9]/)
      .messages({
        'string.min': 'Senha deve ter no mínimo 8 caracteres',
        'string.pattern.base': 'Senha deve conter letra maiúscula, minúscula e número',
        'string.empty': 'Senha é obrigatória',
      }),
  }),

  // Validação de login
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .lowercase()
      .messages({
        'string.email': 'E-mail inválido',
        'string.empty': 'E-mail é obrigatório',
      }),
    senha: Joi.string()
      .required()
      .messages({
        'string.empty': 'Senha é obrigatória',
      }),
  }),
};

/**
 * Validador middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Erro de validação',
        erros: messages,
      });
    }

    // Substitui body com dados validados
    req.body = value;
    next();
  };
};

module.exports = {
  authSchemas,
  validate,
};
