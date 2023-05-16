const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { log } = require('console');

// Make directory if not yet
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Make file contact.json if not yet
const dirFile = './data/contacts.json';
if (!fs.existsSync(dirFile)) {
    fs.writeFileSync(dirFile, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const saveContact = (name, email, noHP) => {
    const contact = { name, email, noHP };
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer);
    const contacts = loadContact();

    // Duplicate contact check
    const isDuplicateName = contacts.some((contact) => contact.name === name);
    const isDuplicateNoHP = contacts.some((contact) => contact.noHP === noHP);

    
    if (isDuplicateName) {
        console.log(chalk.red.inverse.bold('Contact with the same name has already been added, choose other name'));
        return false;
    }

    if (isDuplicateNoHP) {
        console.log(chalk.red.inverse.bold('Contact with the same noHP has already been added, choose other contact number'));
        return false;
    }

    // Email check
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Invalid email'));
            return false;
        }
    }

    // Contact number check
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Invalid contact number'));
        return false;      
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Contact added successfully'));
    return true;
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('List of Contacts :'));

    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.name} - ${contact.noHP}`);
    });
}

const detailContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${name} not found`));
        return false;
    }

    console.log('Name : ',chalk.cyan.inverse.bold(contact.name));
    if (contact.email) {
        console.log('Email :', chalk.cyan.inverse.bold(contact.email));
    } else {
        console.log('Email: -');
    }
    console.log('Contact number :', chalk.cyan.inverse.bold(contact.noHP));
    return true;
}

const deleteContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.findIndex((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (contact === -1) {
        console.log(chalk.red.inverse.bold(`${name} not found`));
        return false;
    }

    contacts.splice(contact, 1);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold(`Contact with name ${name} deleted successfully`));
    return true;
}

module.exports = { saveContact, listContact, detailContact, deleteContact };