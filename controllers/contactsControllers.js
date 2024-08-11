// import User from "../db/models/Contacts.js";
import {
  updateContactSchema,
  createContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await listContacts();

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);

    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const deleteContact = await removeContact(req.params.id);
    if (deleteContact) {
      res.json({
        status: "success",
        code: 200,
        data: { deleteContact },
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { name, email, phone } = req.body;

    const result = await addContact(name, email, phone);
    if (result) {
      res.json({
        status: "success",
        code: 201,
        data: { result },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { id } = req.params;
    const updateContact = await updateContacts(id, req.body);
    if (!updateContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { contact: updateContact },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
