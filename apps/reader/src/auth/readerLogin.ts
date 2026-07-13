export type ReaderLoginCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
};

export type ReaderLoginDependencies = {
  findUserByEmail: (email: string) => Promise<User | null>;
  verifyPassword: (
    password: string,
    passwordHash: string,
  ) => Promise<boolean>;
};

export type ReaderLoginResult = {
  session?: {
    userId: string;
    emailVerified: boolean;
  };
  error?: string;
};

const invalidCredentialsResult: ReaderLoginResult = {
  error: "Invalid email or password",
};

export const readerLogin = async (
  credentials: ReaderLoginCredentials,
  { findUserByEmail, verifyPassword }: ReaderLoginDependencies,
): Promise<ReaderLoginResult> => {
  const user = await findUserByEmail(credentials.email);

  if (user === null || user.email !== credentials.email) {
    return invalidCredentialsResult;
  }

  const passwordMatches = await verifyPassword(
    credentials.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    return invalidCredentialsResult;
  }

  return {
    session: {
      userId: user.id,
      emailVerified: user.emailVerified,
    },
  };
};
