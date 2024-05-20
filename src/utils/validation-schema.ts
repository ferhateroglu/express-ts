import Joi from 'joi';

const byIdSchema = Joi.object({
  id: Joi.number().required(),
});

const barrowReturnSchema = Joi.object({
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
});

const createSchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
});

const returnBodySchema = Joi.object({
  score: Joi.number().required().min(0).max(5),
});

export { byIdSchema, barrowReturnSchema, createSchema, returnBodySchema };
