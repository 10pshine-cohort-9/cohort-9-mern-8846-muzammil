const express = require('express');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createNoteSchema, updateNoteSchema, paramsIdSchema } = require('../utils/validationSchemas');
const {
  createNoteController,
  getNotesController,
  getNoteByIdController,
  updateNoteController,
  deleteNoteController,
} = require('../controllers/notesController');

const router = express.Router();

router.use(protect);
router.post('/', validateRequest(createNoteSchema), createNoteController);
router.get('/', getNotesController);
router.get('/:id', validateRequest(paramsIdSchema), getNoteByIdController);
router.put('/:id', validateRequest(paramsIdSchema), validateRequest(updateNoteSchema), updateNoteController);
router.delete('/:id', validateRequest(paramsIdSchema), deleteNoteController);

module.exports = router;
