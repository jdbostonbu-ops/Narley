export type ReaderSignupCredentials = {
  email: string;
  password: string;
};

export type ReaderSignupUser = {
  id: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
};

export type CreatedReaderUser = {
  id: string;
  email: string;
  emailVerified: boolean;
};

export type PasswordValidationResult = {
  valid: boolean;
  errors: string[];
};

export type ReaderSignupDependencies = {
  validatePassword: (password: string) => PasswordValidationResult;
  findUserByEmail: (email: string) => Promise<ReaderSignupUser | null>;
  hashPassword: (password: string) => Promise<string>;
  createUser: (input: {
    email: string;
    passwordHash: string;
  }) => Promise<CreatedReaderUser>;
};

export type ReaderSignupResult =
  | { ok: true; userId: string }
  | { ok: false; error: string };

export const readerSignup = async (
  credentials: ReaderSignupCredentials,
  {
    validatePassword,
    findUserByEmail,
    hashPassword,
    createUser,
  }: ReaderSignupDependencies,
): Promise<ReaderSignupResult> => {
  const passwordValidation = validatePassword(credentials.password);

  if (!passwordValidation.valid) {
    return {
      ok: false,
      error:
        passwordValidation.errors.join(" ") ||
        "Password does not meet the required strength policy",
    };
  }

  const existingUser = await findUserByEmail(credentials.email);

  if (existingUser !== null) {
    return {
      ok: false,
      error: "An account with this email already exists",
    };
  }

  const passwordHash = await hashPassword(credentials.password);
  const createdUser = await createUser({
    email: credentials.email,
    passwordHash,
  });

  return {
    ok: true,
    userId: createdUser.id,
  };
};
