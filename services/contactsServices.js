import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import User from "../db/models/Contacts.js";

// Отримання поточного шляху файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = path.join(__dirname, "../db", "contacts.json");

async function listContacts() {
  const contacts = User.findAll();
  return contacts;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

  const contact = User.findOne({ where: { id: contactId } });

  return contact || null;
}
async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).

  const newContact = User.create({
    name,
    email,
    phone,
  });

  return newContact;
}
async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

  const contact = User.destroy({ where: { id: contactId } });

  return contact;
}

async function updateContacts(id, updateFields) {
  try {
    const updatedContact = await User.update(
      updateFields,

      {
        where: {
          id: id,
        },
      }
    );

    return updatedContact;
  } catch (error) {
    throw new Error("Error updating contact");
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
