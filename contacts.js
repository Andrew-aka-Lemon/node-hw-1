const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');

//Get list of all contacts
async function listContacts() {
  let contacts = [];
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log("Can't read Contacts!");
  }

  console.table(contacts);
}

async function getContactById(contactId) {
  let contacts = [];
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log("Can't read Contacts!");
  }

  const choosenContact = contacts.filter(contact => contact.id === contactId);

  console.table(choosenContact);
}

async function removeContact(contactId) {
  let contacts = [];
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log("Can't read Contacts!");
  }

  const withoutChoosenContact = contacts.filter(
    contact => contact.id !== contactId
  );

  if (contacts.length === withoutChoosenContact.length) {
    console.log('There is no contact with such ID !');
    return;
  }

  fs.writeFile(contactsPath, JSON.stringify(withoutChoosenContact));

  console.table(withoutChoosenContact);
}

async function addContact(name, email, phone) {
  const id = Date.now();
  const newContact = { id, name, email, phone };

  let contacts = [];

  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log("Can't read Contacts!");
  }

  const newContacts = [...contacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(newContacts));

  console.table(newContacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
