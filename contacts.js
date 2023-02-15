const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('db/contacts.json');

//Get list of all contacts
async function listContacts() {
  let contacts = [];
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log("Can't read Contacts!");
  }

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const choosenContact = contacts.filter(contact => contact.id === contactId);
  if (choosenContact.length === 0) {
    console.log('There is no book with such ID !');
    return null;
  }
  return choosenContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const withoutChoosenContact = contacts.filter(
    contact => contact.id !== contactId
  );

  if (contacts.length === withoutChoosenContact.length) {
    console.log('There is no contact with such ID !');
    return null;
  }

  fs.writeFile(contactsPath, JSON.stringify(withoutChoosenContact));

  return withoutChoosenContact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };

  const contacts = await listContacts();

  const newContacts = [...contacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
