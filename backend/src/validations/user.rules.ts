import { ValidationRule } from '../middlewares/validation.middleware';

export const userUpdateRules: ValidationRule[] = [
  { field: 'name', required: false, type: 'string', minLength: 2, maxLength: 100 },
  { field: 'email', required: false, type: 'email' },
];

export const passwordChangeRules: ValidationRule[] = [
  { field: 'currentPassword', required: true, type: 'string' },
  { field: 'newPassword', required: true, type: 'string', minLength: 6 },
];
