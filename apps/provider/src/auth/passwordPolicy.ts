export type PasswordValidationResult = {
  valid: boolean;
};

export const validatePassword = (
  password: string,
): PasswordValidationResult => {
  const digitCount = (password.match(/\d/g) ?? []).length;
  const specialCharacterCount = (password.match(/[!@#$%&*]/g) ?? []).length;

  return {
    valid:
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      digitCount >= 2 &&
      specialCharacterCount >= 2,
  };
};
