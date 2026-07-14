import bcrypt from "bcryptjs";

type User = {
  id: string;
  email: string;
};

type ResetToken = {
  userId: string;
  expiresAt: Date;
  usedAt: Date | null;
};

type PasswordResetDependencies = {
  findUserByEmail: (email: string) => Promise<User | null>;
  generateCode: () => string;
  saveResetToken: (
    userId: string,
    token: string,
    expiresAt: Date,
  ) => Promise<unknown>;
  sendResetEmail: (email: string, token: string) => Promise<unknown>;
  findResetToken: (token: string) => Promise<ResetToken | null>;
  updatePassword: (userId: string, passwordHash: string) => Promise<unknown>;
  consumeResetToken: (token: string) => Promise<unknown>;
  invalidateSessions: (userId: string) => Promise<unknown>;
};

type ConfirmPasswordResetInput = {
  token: string;
  newPassword: string;
};

type PasswordResetResult = {
  success: boolean;
};

const requestResponse = {
  message: "If that email is registered, a reset link is on its way.",
};

export const requestPasswordReset = async (
  email: string,
  deps: PasswordResetDependencies,
): Promise<typeof requestResponse> => {
  const user = await deps.findUserByEmail(email);

  if (user !== null) {
    const token = deps.generateCode();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await deps.saveResetToken(user.id, token, expiresAt);
    await deps.sendResetEmail(user.email, token);
  }

  return requestResponse;
};

export const confirmPasswordReset = async (
  { token, newPassword }: ConfirmPasswordResetInput,
  deps: PasswordResetDependencies,
): Promise<PasswordResetResult> => {
  const resetToken = await deps.findResetToken(token);

  if (
    resetToken === null ||
    resetToken.usedAt !== null ||
    resetToken.expiresAt.getTime() <= Date.now()
  ) {
    return { success: false };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await deps.updatePassword(resetToken.userId, passwordHash);
  await deps.consumeResetToken(token);
  await deps.invalidateSessions(resetToken.userId);

  return { success: true };
};
