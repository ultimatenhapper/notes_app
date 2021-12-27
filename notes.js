const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
  return 'Your notes...'
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    console.log(`${title} note has been added!`)
    saveNotes(notes)

  } else {
    console.log(`${title} is duplicated. Not added!!`)
    
  }
}

const removeNote = function (title) {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(`${chalk.green.inverse(title)} has been deleted`)

  } else {
    console.log(`${chalk.red.inverse(title)} not found in notes`)

  }
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.yellow.inverse('Your notes'))
  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = loadNotes()

  const noteToRead = notes.find((note) => note.title === title )

  if (noteToRead) {
    console.log( `Title: ${chalk.green.inverse(noteToRead.title)} Body: ${chalk.green(noteToRead.body)}`)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    
    return JSON.parse(dataJSON)

  } catch (e) {
    return []

  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)

}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}