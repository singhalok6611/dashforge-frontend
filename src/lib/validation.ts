/**
 * Form validation utilities
 */

export interface ValidationRule {
  validate: (value: any, formData?: Record<string, any>) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: (value: any) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    },
    message,
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    validate: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validate: (value: string) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    validate: (value: string) => value.length <= max,
    message: message || `Must be at most ${max} characters`,
  }),

  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
    validate: (value: string) => regex.test(value),
    message,
  }),

  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    validate: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
  }),

  number: (message = 'Must be a number'): ValidationRule => ({
    validate: (value: any) => !isNaN(Number(value)),
    message,
  }),

  min: (min: number, message?: string): ValidationRule => ({
    validate: (value: number) => value >= min,
    message: message || `Must be at least ${min}`,
  }),

  max: (max: number, message?: string): ValidationRule => ({
    validate: (value: number) => value <= max,
    message: message || `Must be at most ${max}`,
  }),

  match: (otherField: string, message = 'Fields do not match'): ValidationRule => ({
    validate: (value: string, formData?: Record<string, any>) => {
      return formData ? value === formData[otherField] : true;
    },
    message,
  }),
};

/**
 * Validate a single field against multiple rules
 */
export function validateField(
  value: any,
  rules: ValidationRule[],
  formData?: Record<string, any>
): string | null {
  for (const rule of rules) {
    if (!rule.validate(value, formData)) {
      return rule.message;
    }
  }
  return null;
}

/**
 * Validate an entire form with multiple fields
 */
export function validateForm(
  formData: Record<string, any>,
  schema: Record<string, ValidationRule[]>
): ValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(formData[field], rules, formData);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password should be at least 8 characters long');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one lowercase letter');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one number');
  }

  // Special character check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one special character');
  }

  return { score, feedback };
}
