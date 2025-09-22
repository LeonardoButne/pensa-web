import { ValidationRule } from '../middlewares/validation.middleware';

export const loginRules: ValidationRule[] = [
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string', minLength: 6 },
];

export const bootstrapRules: ValidationRule[] = [
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 100 },
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string', minLength: 6 },
  { field: 'bootstrapToken', required: true, type: 'string' },
];
