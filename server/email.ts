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
