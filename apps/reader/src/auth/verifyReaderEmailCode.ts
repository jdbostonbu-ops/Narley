export type VerifyReaderEmailCodeInput = {
  email: string;
  code: string;
};

export type StoredReaderEmailCode = {
  email: string;
  code: string;
  expiresAt: Date;
  usedAt: Date | null;
};

export type VerifyReaderEmailCodeDependencies = {
  findCode: (
    email: string,
    code: string,
  ) => Promise<StoredReaderEmailCode | null>;
  markEmailVerified: (email: string) => Promise<void>;
  consumeCode: (email: string, code: string) => Promise<void>;
};

export type VerifyReaderEmailCodeResult = {
  ok: boolean;
};

export const verifyReaderEmailCode = async (
  input: VerifyReaderEmailCodeInput,
  {
    findCode,
    markEmailVerified,
    consumeCode,
  }: VerifyReaderEmailCodeDependencies,
): Promise<VerifyReaderEmailCodeResult> => {
  const storedCode = await findCode(input.email, input.code);

  if (storedCode === null) {
    return { ok: false };
  }

  if (storedCode.usedAt !== null) {
    return { ok: false };
  }

  if (storedCode.expiresAt.getTime() <= Date.now()) {
    return { ok: false };
  }

  await markEmailVerified(input.email);
  await consumeCode(input.email, input.code);

  return { ok: true };
};
