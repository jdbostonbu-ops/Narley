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

type ProviderReportEmail = {
  resourceTitle: string;
  address: string;
  phone?: string;
  website?: string;
  details: string;
  reportedBy: string;
};

export const sendProviderReportEmail = async (
  report: ProviderReportEmail,
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jdboston.bu@gmail.com",
    subject: "Narley: Provider report of a resource",
    text: [
      "A provider reported a problem resource to Narley.",
      "",
      `Resource title: ${report.resourceTitle}`,
      `Address: ${report.address}`,
      `Phone: ${report.phone ?? "Not provided"}`,
      `Website: ${report.website ?? "Not provided"}`,
      `Reported by provider user ID: ${report.reportedBy}`,
      "",
      "Details:",
      report.details,
    ].join("\n"),
  });

  if (error !== null) {
    throw new Error(`Unable to send provider report email: ${error.message}`);
  }
};
