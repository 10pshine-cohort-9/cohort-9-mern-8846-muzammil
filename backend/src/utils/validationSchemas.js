const { z } = require('zod');

/**
 * Zod schemas for notes-related request validation.
 */
const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120).transform((s) => s.trim()),
  content: z.string().min(1, 'Content is required'),
});

const updateNoteSchema = z.object({
  title: z.string().min(1).max(120).optional().transform((s) => (s ? s.trim() : s)),
  content: z.string().min(1).optional(),
});

const paramsIdSchema = z.object({
  id: z.string().min(1),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
  paramsIdSchema,
};
