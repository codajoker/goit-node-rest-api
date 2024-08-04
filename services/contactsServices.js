import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// Отримання поточного шляху файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = path.join(__dirname, "../db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.

  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContacts(id, updateFields) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
      return null;
    }

    const updatedContact = {
      ...contacts[contactIndex],
      ...updateFields,
    };

    contacts[contactIndex] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

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
