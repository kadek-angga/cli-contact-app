const yargs = require('yargs');
const { saveContact, listContact, detailContact, deleteContact } = require('./contacts');

// get argument from command line

yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Contact number',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        saveContact(argv.name, argv.email, argv.noHP);
    }
}).demandCommand();

// Showing all list of contacts
yargs.command({
    command: 'list',
    describe: 'get all list of name and contacts number',
    handler() {
        listContact();
    }
});

// Showing details of one contact by name
yargs.command({
    command: 'detail',
    describe: 'get details of contact by name',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.name);
    },
});

// Delete contact by name
yargs.command({
    command: 'delete',
    describe: 'delete contact by name',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.name);
    },
});

yargs.parse();

















// const { log } = require('console');
// const { addContact, saveContact } = require('./contacts');


// const main = async () => {
//     const name = await addContact('Input name: ');
//     const email = await addContact('Input email: ');
//     const noHP = await addContact('Input contact number: ');

//     saveContact(name, email, noHP);
// }

// main();