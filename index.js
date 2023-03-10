const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.listContacts());
      break;

    case 'get':
      console.table(await contacts.getContactById(id));
      break;

    case 'remove':
      console.table(await contacts.removeContact(id));
      break;

    case 'add':
      console.table(await contacts.addContact({ name, email, phone }));
      break;
    case 'update':
      console.table(await contacts.updateContact(id, { name, email, phone }));
      break;

    default:
      console.warn('\x1B[31m Unknown action t-`ype!');
  }
}

invokeAction(argv);
