const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Notes successfully added',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Note is fail to added'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
})

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params

  const note = notes.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Note isnt found'
  })
  response.code(400)
  return response
}

const editNodeByIdHandler = (request, h) => {
  const { id } = request.params

  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Notes successfully updated'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Fail to update the note. Id not found!'
  })
  response.code(404)
  return response
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'note successfully deleted'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'fail to delete note!'
  })
  response.code(404)
  return response
}
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNodeByIdHandler, deleteNoteByIdHandler }
