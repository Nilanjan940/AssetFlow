export const validators = {
  email: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  phone: (phone: string): boolean => {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  password: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  },

  required: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined;
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  isNumber: (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  isPositive: (value: number): boolean => {
    return value > 0;
  },

  isInteger: (value: number): boolean => {
    return Number.isInteger(value);
  },

  oneOf: (value: any, options: any[]): boolean => {
    return options.includes(value);
  },
};