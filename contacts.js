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

  fs.writeFile(contactsPath, JSON.stringify(withoutChoosenContact, null, 2));

  return withoutChoosenContact;
}

async function addContact(body) {
  const id = nanoid();
  const newContact = { id, ...body };

  const contacts = await listContacts();

  const newContacts = [...contacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return newContacts;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    console.log('There is no contact with such ID !');
    return null;
  }

  const updatedContact = { contactId, ...body };

  contacts.splice(index, 1, updatedContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
