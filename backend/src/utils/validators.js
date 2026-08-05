const { z } = require('zod');

/**
 * Zod schemas for auth request validation.
 */
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long').transform((s) => s.trim()),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

module.exports = {
  registerSchema,
  loginSchema,
};
