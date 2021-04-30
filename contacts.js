const fs = require("fs/promises");
const shortid = require("shortid");
const path = require("path");
const contactPath = path.join(__dirname, "./db/contacts.json");
const contacts = fs.readFile(contactPath);

async function listContacts() {
  try {
    return await contacts.then((data) => JSON.parse(data));
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    return await listContacts().then((data) =>
      data.find((contact) => contact.id === Number(contactId))
    );
  } catch (error) {
    return console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const result = list.filter((item) => item.id !== Number(contactId));

    const data = JSON.stringify(result);
    fs.writeFile(contactPath, data, (err) => {
      err && console.log(err.message);
    });

    return list;
  } catch (error) {
    return console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    return await listContacts().then((contact) => {
      const incomingData = { id: shortid.generate(), name, email, phone };
      const saveData = contact;

      const data = JSON.stringify([...saveData, incomingData]);
      fs.writeFile(contactPath, data, (err) => {
        err && console.log(err.message);
      });
    });
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
