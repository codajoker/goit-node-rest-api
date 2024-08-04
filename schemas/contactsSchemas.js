import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing": "Body must have at all field",
  });
export const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing": "Body must have at least one field",
  });
