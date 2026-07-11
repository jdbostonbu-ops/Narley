export type PasswordValidationResult = {
  valid: boolean;
  errors: string[];
};

export const validatePassword = (
  password: string,
): PasswordValidationResult => {
  const digitCount = (password.match(/\d/g) ?? []).length;
  const specialCharacterCount = (password.match(/[!@#$%&*]/g) ?? []).length;
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must contain at least 8 characters.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least 1 uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least 1 lowercase letter.");
  }

  if (digitCount < 2) {
    errors.push("Password must contain at least 2 digits.");
  }

  if (specialCharacterCount < 2) {
    errors.push("Password must contain at least 2 special characters.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
