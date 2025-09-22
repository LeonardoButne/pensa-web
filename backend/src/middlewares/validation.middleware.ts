import type { Request, Response, NextFunction } from 'express';

interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'email' | 'string' | 'number' | 'boolean';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export const validateRequest = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: ValidationError[] = [];
    const data = { ...req.body, ...req.query, ...req.params };
    console.log('validateRequest data:', data);

    for (const rule of rules) {
      const value = data[rule.field];

      // Check required fields
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push({
          field: rule.field,
          message: `${rule.field} é obrigatório`,
        });
        continue;
      }

      // Skip validation if field is not required and empty
      if (!rule.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      // Type validation
      if (rule.type) {
        switch (rule.type) {
          case 'email':
            if (!isValidEmail(value)) {
              errors.push({
                field: rule.field,
                message: `${rule.field} deve ser um email válido`,
              });
            }
            break;
          case 'string':
            if (typeof value !== 'string') {
              errors.push({
                field: rule.field,
                message: `${rule.field} deve ser uma string`,
              });
            }
            break;
          case 'number':
            if (isNaN(Number(value))) {
              errors.push({
                field: rule.field,
                message: `${rule.field} deve ser um número`,
              });
            }
            break;
        }
      }

      // Length validation
      if (rule.minLength && value.length < rule.minLength) {
        errors.push({
          field: rule.field,
          message: `${rule.field} deve ter pelo menos ${rule.minLength} caracteres`,
        });
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push({
          field: rule.field,
          message: `${rule.field} deve ter no máximo ${rule.maxLength} caracteres`,
        });
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push({
          field: rule.field,
          message: `${rule.field} tem formato inválido`,
        });
      }

      // Custom validation
      if (rule.custom) {
        const result = rule.custom(value);
        if (result !== true) {
          errors.push({
            field: rule.field,
            message: typeof result === 'string' ? result : `${rule.field} é inválido`,
          });
        }
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        error: 'Dados inválidos',
        details: errors,
      });
      return;
    }

    next();
  };
};

// Common validation helpers
export const sanitizeInput = (value: string): string => {
  return value.trim().replace(/[<>]/g, '');
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation rules for common use cases
export const userValidationRules: ValidationRule[] = [
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 100 },
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string', minLength: 6 },
];

export const diseaseValidationRules: ValidationRule[] = [
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 200 },
  { field: 'description', required: true, type: 'string', minLength: 10 },
  { field: 'symptoms', required: false, type: 'string' },
  { field: 'treatment', required: false, type: 'string' },
  { field: 'prevention', required: false, type: 'string' },
  { field: 'causes', required: true, type: 'string', minLength: 5, maxLength: 500 },
];

export const doctorValidationRules: ValidationRule[] = [
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 100 },
  { field: 'specialty', required: true, type: 'string', minLength: 2, maxLength: 100 },
  { field: 'phone', required: true, type: 'string' },
  { field: 'email', required: true, type: 'email' },
  { field: 'address', required: false, type: 'string' },
];

export const contactValidationRules: ValidationRule[] = [
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 100 },
  { field: 'email', required: true, type: 'email' },
  { field: 'subject', required: true, type: 'string', minLength: 5, maxLength: 200 },
  { field: 'message', required: true, type: 'string', minLength: 10, maxLength: 1000 },
];
