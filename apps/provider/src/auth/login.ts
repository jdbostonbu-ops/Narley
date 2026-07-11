import bcrypt from "bcrypt";

type Credentials = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  passwordHash: string;
};

type LoginDependencies = {
  findUserByEmail: (email: string) => Promise<User | null>;
};

type LoginResult = {
  session?: {
    userId: string;
  };
  error?: string;
};

const invalidCredentialsResult: LoginResult = {
  error: "Invalid email or password",
};

export const login = async (
  credentials: Credentials,
  { findUserByEmail }: LoginDependencies,
): Promise<LoginResult> => {
  const user = await findUserByEmail(credentials.email);

  if (user === null || user.email !== credentials.email) {
    return invalidCredentialsResult;
  }

  const passwordMatches = await bcrypt.compare(
    credentials.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    return invalidCredentialsResult;
  }

  return {
    session: {
      userId: user.id,
    },
  };
};
