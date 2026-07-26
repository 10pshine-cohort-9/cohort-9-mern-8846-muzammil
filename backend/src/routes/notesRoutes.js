const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  createNoteController,
  getNotesController,
  getNoteByIdController,
  updateNoteController,
  deleteNoteController,
} = require('../controllers/notesController');

const router = express.Router();

router.use(protect);
router.post('/', createNoteController);
router.get('/', getNotesController);
router.get('/:id', getNoteByIdController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);

module.exports = router;
