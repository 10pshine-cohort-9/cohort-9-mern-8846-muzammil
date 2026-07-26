const Note = require('../models/Note');
const logger = require('../config/logger');

/**
 * Create a structured error with an optional HTTP status code.
 *
 * @param {string} message - Error message.
 * @param {number} [statusCode=500] - HTTP status code.
 * @returns {Error & { statusCode: number }} Error instance.
 */
const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Create a new note for the authenticated user.
 *
 * @param {{ userId: string, title: string, content: string }} payload - Note payload.
 * @returns {Promise<object>} Created note document.
 */
const createNote = async ({ userId, title, content }) => {
  const note = await Note.create({ userId, title, content });
  logger.info({ userId, noteId: note._id }, 'Note created');
  return note;
};

/**
 * Fetch all notes owned by a specific user.
 *
 * @param {string} userId - Authenticated user identifier.
 * @returns {Promise<Array<object>>} User notes.
 */
const getUserNotes = async (userId) => {
  return Note.find({ userId }).sort({ createdAt: -1 });
};

/**
 * Fetch a single note by id after verifying ownership.
 *
 * @param {string} noteId - Note identifier.
 * @param {string} userId - Authenticated user identifier.
 * @returns {Promise<object>} Note document.
 */
const getNoteById = async (noteId, userId) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw createError('Note not found', 404);
  }

  if (note.userId.toString() !== userId.toString()) {
    throw createError('You are not authorized to access this note', 403);
  }

  return note;
};

/**
 * Update an existing note after verifying ownership.
 *
 * @param {string} noteId - Note identifier.
 * @param {string} userId - Authenticated user identifier.
 * @param {{ title?: string, content?: string }} updates - Note updates.
 * @returns {Promise<object>} Updated note document.
 */
const updateNote = async (noteId, userId, updates) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw createError('Note not found', 404);
  }

  if (note.userId.toString() !== userId.toString()) {
    throw createError('You are not authorized to update this note', 403);
  }

  if (updates.title !== undefined) {
    note.title = updates.title;
  }

  if (updates.content !== undefined) {
    note.content = updates.content;
  }

  const updatedNote = await note.save();
  logger.info({ userId, noteId }, 'Note updated');
  return updatedNote;
};

/**
 * Delete a note after verifying ownership.
 *
 * @param {string} noteId - Note identifier.
 * @param {string} userId - Authenticated user identifier.
 * @returns {Promise<object>} Deleted note document.
 */
const deleteNote = async (noteId, userId) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw createError('Note not found', 404);
  }

  if (note.userId.toString() !== userId.toString()) {
    throw createError('You are not authorized to delete this note', 403);
  }

  const deletedNote = await Note.findByIdAndDelete(noteId);
  logger.info({ userId, noteId }, 'Note deleted');
  return deletedNote;
};

module.exports = {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
