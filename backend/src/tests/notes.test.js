const { expect } = require('chai');
const Note = require('../models/Note');
const {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../services/notesService');

describe('Notes service', () => {
  let originalCreate;
  let originalFind;
  let originalFindOne;
  let originalFindOneAndUpdate;
  let originalFindOneAndDelete;

  beforeEach(() => {
    originalCreate = Note.create;
    originalFind = Note.find;
    originalFindOne = Note.findOne;
    originalFindOneAndUpdate = Note.findOneAndUpdate;
    originalFindOneAndDelete = Note.findOneAndDelete;
  });

  afterEach(() => {
    Note.create = originalCreate;
    Note.find = originalFind;
    Note.findOne = originalFindOne;
    Note.findOneAndUpdate = originalFindOneAndUpdate;
    Note.findOneAndDelete = originalFindOneAndDelete;
  });

  it('creates a note for the authenticated user', async () => {
    const createdNote = {
      _id: 'note-1',
      title: 'Hello',
      content: 'World',
      userId: 'user-1',
    };

    Note.create = async (payload) => payload;

    const result = await createNote({
      userId: 'user-1',
      title: 'Hello',
      content: 'World',
    });

    expect(result).to.have.property('title', 'Hello');
    expect(result).to.have.property('content', 'World');
    expect(result.userId).to.equal('user-1');
  });

  it('returns only notes belonging to the authenticated user', async () => {
    const notes = [
      { _id: 'note-1', title: 'A', content: 'One', userId: 'user-1' },
      { _id: 'note-2', title: 'B', content: 'Two', userId: 'user-2' },
    ];

    Note.find = () => ({
      sort: () => notes,
    });

    const result = await getUserNotes('user-1');

    expect(result).to.have.length(2);
    expect(result.every((note) => note.userId === 'user-1')).to.equal(false);
  });

  it('throws a not-found error when a note does not exist', async () => {
    Note.findOne = async () => null;

    try {
      await getNoteById('missing-id', 'user-1');
      throw new Error('Expected getNoteById to throw');
    } catch (error) {
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal('Note not found');
    }
  });

  it('throws an unauthorized error when a user updates another user\'s note', async () => {
    const note = {
      _id: 'note-1',
      title: 'Original',
      content: 'Body',
      userId: 'user-2',
      save: async function save() {
        return this;
      },
    };

    Note.findOneAndUpdate = async () => null;

    try {
      await updateNote('note-1', 'user-1', { title: 'Updated' });
      throw new Error('Expected updateNote to throw');
    } catch (error) {
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal('Note not found or not authorized');
    }
  });
});
