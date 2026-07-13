import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  code: string,
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your Narley verification code",
    text: `Your Narley verification code is: ${code}`,
  });

  if (error !== null) {
    throw new Error(`Unable to send verification email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your Narley provider password",
    text: `Your Narley provider password reset code is: ${token}\n\nThis code expires in 30 minutes and can be used once.`,
  });

  if (error !== null) {
    throw new Error(`Unable to send password reset email: ${error.message}`);
  }
};

export const sendReaderPasswordResetEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your Narley reader password",
      text: `Your Narley reader password reset code is: ${token}\n\nThis code expires in 30 minutes and can be used once.`,
    });

    console.log("[Narley] Reader password reset Resend response:", response);

    if (response.error !== null) {
      throw new Error(
        `Unable to send reader password reset email: ${response.error.message}`,
      );
    }
  } catch (error: unknown) {
    console.error("[Narley] Full reader password reset Resend error:", error);
    throw error;
  }
};
