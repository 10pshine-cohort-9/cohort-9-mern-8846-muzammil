const {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../services/notesService');

/**
 * Create a new note for the authenticated user.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const createNoteController = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const note = await createNote({ userId: req.user._id, title, content });
    res.status(201).json({ success: true, message: 'Note created successfully', data: note });
  } catch (error) {
    next(error);
  }
};

/**
 * Return all notes owned by the authenticated user.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const getNotesController = async (req, res, next) => {
  try {
    const notes = await getUserNotes(req.user._id);
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

/**
 * Return a single note if the authenticated user owns it.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const getNoteByIdController = async (req, res, next) => {
  try {
    const note = await getNoteById(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an owned note.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const updateNoteController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ success: false, message: 'At least one field is required' });
    }

    const note = await updateNote(req.params.id, req.user._id, { title, content });
    res.status(200).json({ success: true, message: 'Note updated successfully', data: note });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an owned note.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const deleteNoteController = async (req, res, next) => {
  try {
    const note = await deleteNote(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: 'Note deleted successfully', data: note });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNoteController,
  getNotesController,
  getNoteByIdController,
  updateNoteController,
  deleteNoteController,
};
