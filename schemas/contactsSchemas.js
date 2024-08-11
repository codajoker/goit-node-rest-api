import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing": "Body must have at all field",
  });
export const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
  favorite: Joi.boolean().optional(),
})
  .or("name", "email", "phone", "favorite")
  .messages({
    "object.missing": "Body must have at least one field",
  });
