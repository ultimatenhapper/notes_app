const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')

yargs.command({
  command: 'add',
  describe: 'Add a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }, 
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    // console.log('Adding a note...', argv.title)
    notes.addNote(argv.title, argv.body)
  }
});

yargs.command({
  command: 'remove',
  describe: 'Removing a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title)
  }
});

yargs.command({
  command: 'read',
  describe: 'Reading a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.readNote(argv.title)
  }
});

yargs.command({
  command: 'list',
  describe: 'Listing notes',
  handler: function() {
    notes.listNotes()
  }
})

yargs.parse();

console.log(chalk.green('Success!'));
// console.log(process.argv);