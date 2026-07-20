const MAILTRAP_API_URL = "https://send.api.mailtrap.io/api/send";
const FROM_ADDRESS = "noreply@your-narley.app";
const FROM_NAME = "Narley";

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  errorContext: string;
};

const sendEmail = async ({
  to,
  subject,
  text,
  errorContext,
}: SendArgs): Promise<void> => {
  const response = await fetch(MAILTRAP_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: FROM_ADDRESS, name: FROM_NAME },
      to: [{ email: to }],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Unable to send ${errorContext}: ${response.status} ${body}`,
    );
  }
};

export const sendVerificationEmail = async (
  email: string,
  code: string,
): Promise<void> => {
  await sendEmail({
    to: email,
    subject: "Your Narley verification code",
    text: `Your Narley verification code is: ${code}`,
    errorContext: "verification email",
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  await sendEmail({
    to: email,
    subject: "Reset your Narley provider password",
    text: `Your Narley provider password reset code is: ${token}\n\nThis code expires in 30 minutes and can be used once.`,
    errorContext: "password reset email",
  });
};

export const sendReaderPasswordResetEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  await sendEmail({
    to: email,
    subject: "Reset your Narley reader password",
    text: `Your Narley reader password reset code is: ${token}\n\nThis code expires in 30 minutes and can be used once.`,
    errorContext: "reader password reset email",
  });
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
  await sendEmail({
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
    errorContext: "provider report email",
  });
};