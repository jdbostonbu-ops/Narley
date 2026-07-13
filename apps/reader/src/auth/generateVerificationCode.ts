const verificationCodeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const verificationCodeLength = 6;

export const generateVerificationCode = (): string =>
  Array.from({ length: verificationCodeLength }, () => {
    const characterIndex = Math.floor(
      Math.random() * verificationCodeAlphabet.length,
    );

    return verificationCodeAlphabet[characterIndex];
  }).join("");
