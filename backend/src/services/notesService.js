const Note = require('../models/Note');
const logger = require('../config/logger');
const AppError = require('../utils/AppError');

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
  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw new AppError('Note not found', 404);
  }

  logger.info({ userId, noteId }, 'Note retrieved');
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
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    { $set: updates },
    { new: true }
  );

  if (!note) {
    throw new AppError('Note not found or not authorized', 404);
  }

  logger.info({ userId, noteId }, 'Note updated');
  return note;
};

/**
 * Delete a note after verifying ownership.
 *
 * @param {string} noteId - Note identifier.
 * @param {string} userId - Authenticated user identifier.
 * @returns {Promise<object>} Deleted note document.
 */
const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    throw new AppError('Note not found or not authorized', 404);
  }

  logger.info({ userId, noteId }, 'Note deleted');
  return note;
};

module.exports = {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
