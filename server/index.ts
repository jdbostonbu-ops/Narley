import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { login } from "../apps/provider/src/auth/login";
import { validatePassword } from "../apps/provider/src/auth/passwordPolicy";
import { providerOwnsResource } from "../apps/provider/src/auth/providerOwnsResource";
import { resolveProviderMembership } from "../apps/provider/src/auth/resolveProviderMembership";
import {
  confirmPasswordReset,
  requestPasswordReset,
} from "../apps/provider/src/auth/passwordReset";
import { generateVerificationCode } from "../apps/reader/src/auth/generateVerificationCode";
import { readerLogin } from "../apps/reader/src/auth/readerLogin";
import { readerSignup } from "../apps/reader/src/auth/readerSignup";
import { verifyReaderEmailCode } from "../apps/reader/src/auth/verifyReaderEmailCode";
import { createResource } from "../apps/provider/src/resources/createResource";
import { updateResource } from "../apps/provider/src/resources/updateResource";
import { verifyReaderReport } from "../apps/provider/src/reports/verifyReaderReport";
import { submitProviderReport } from "../apps/provider/src/reports/submitProviderReport";
import { callOpenAI } from "./openai";
import { checkWebsite } from "./checkWebsite";
import { signAuthToken } from "./authToken";
import { loadProviderMembership } from "./loadProviderMembership";
import { prisma } from "./prisma";
import { requireAuth } from "./requireAuth";
import { toApiResource } from "./toApiResource";
import { toWebsiteCheckObservation } from "./websiteCheckObservation";
import {
  sendPasswordResetEmail,
  sendReaderPasswordResetEmail,
  sendProviderReportEmail,
  sendVerificationEmail,
} from "./email";

const app = express();
app.use(cors());
app.use(express.json());

const LANDING_PAGE_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0F4D35" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230F4D35'/%3E%3Cpath d='M12 29 32 12l20 17M17 26v26h30V26M27 52V39h10v13' fill='none' stroke='%23F5F1E8' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" />
    <title>Narley API</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #0F4D35;
        color: #F5F1E8;
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 40px 24px;
        background: #0F4D35;
      }

      main {
        width: min(100%, 680px);
        text-align: center;
      }

      .brand-icon {
        display: block;
        width: 72px;
        height: 72px;
        margin: 0 auto 20px;
        color: #F5F1E8;
      }

      h1 {
        margin: 0;
        color: #F5F1E8;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(48px, 10vw, 72px);
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.02em;
      }

      .tagline {
        margin: 12px 0 24px;
        color: #57C7B6;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 24px;
        font-style: italic;
        font-weight: 700;
      }

      .status {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 28px;
        padding: 9px 15px;
        border: 1px solid rgba(87, 199, 182, 0.45);
        border-radius: 999px;
        background: rgba(11, 61, 45, 0.72);
        color: #F5F1E8;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #57C7B6;
        box-shadow: 0 0 0 4px rgba(87, 199, 182, 0.13);
      }

      .primary-copy {
        margin: 0 auto;
        color: #F5F1E8;
        font-size: clamp(18px, 3vw, 22px);
        font-weight: 600;
        line-height: 1.55;
      }

      .secondary-copy {
        margin: 16px auto 0;
        color: #AFC3B9;
        font-size: 14px;
        line-height: 1.6;
      }

      .try-apps {
        margin-top: 28px;
        padding-top: 28px;
        border-top: 1px solid rgba(245, 241, 232, 0.2);
        text-align: left;
      }

      .try-apps h2 {
        margin: 0 0 16px;
        color: #F5F1E8;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(24px, 4vw, 28px);
      }

      .try-apps ol {
        margin: 0;
        padding-left: 22px;
        color: #AFC3B9;
        font-size: clamp(18px, 3vw, 20px);
        line-height: 1.7;
      }

      .try-apps li + li {
        margin-top: 16px;
      }

      .try-apps ul {
        margin: 10px 0 0;
        padding-left: 20px;
      }

      .demo-login {
        color: #F5F1E8;
      }

      .reader-signup {
        color: #57C7B6;
      }

      .expo-go {
        margin-top: 36px;
        padding-top: 28px;
        border-top: 1px solid rgba(245, 241, 232, 0.2);
        text-align: left;
      }

      .expo-go h2 {
        margin: 0 0 14px;
        color: #F5F1E8;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(24px, 4vw, 28px);
      }

      .expo-go p {
        margin: 0;
        color: #AFC3B9;
        font-size: clamp(18px, 3vw, 20px);
        line-height: 1.7;
      }

      .endpoints {
        margin-top: 36px;
        padding-top: 28px;
        border-top: 1px solid rgba(245, 241, 232, 0.2);
        text-align: left;
      }

      .endpoints-label {
        margin: 0 0 12px;
        color: #AFC3B9;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.16em;
      }

      .endpoint-row {
        display: grid;
        grid-template-columns: minmax(145px, auto) 1fr;
        gap: 20px;
        align-items: center;
        padding: 15px 0;
        border-top: 1px solid rgba(245, 241, 232, 0.11);
      }

      .endpoint {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
        color: #F5F1E8;
        font-size: 14px;
        font-weight: 700;
      }

      .verb {
        margin-right: 10px;
        color: #57C7B6;
      }

      .endpoint-description {
        color: #AFC3B9;
        font-size: 14px;
        line-height: 1.4;
      }

      @media (max-width: 520px) {
        body {
          padding: 32px 20px;
        }

        .endpoint-row {
          grid-template-columns: 1fr;
          gap: 5px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <svg class="brand-icon" viewBox="0 0 72 72" role="img" aria-label="Narley house">
        <path
          d="M12 33 36 12l24 21M17 29v29h38V29M29 58V43h14v15"
          fill="none"
          stroke="currentColor"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h1>Narley</h1>
      <p class="tagline">Help nearby.</p>
      <div class="status" role="status" aria-label="Narley API is online">
        <span class="status-dot" aria-hidden="true"></span>
        API online
      </div>
      <p class="primary-copy">Narley connects people with verified community resources — shelter, food, charging, employment help — on a map that providers keep current.</p>
      <p class="secondary-copy">This URL is the API behind the Provider and Reader mobile apps.</p>

      <section class="try-apps" aria-labelledby="try-apps-heading">
        <h2 id="try-apps-heading">How to try the apps</h2>
        <ol>
          <li>Install &ldquo;Expo Go&rdquo; &mdash; free from the App Store (iPhone) or Google Play (Android).</li>
          <li>
            Open Expo Go and scan the QR code for the app you want to try (I will give you the QR code):
            <ul>
              <li><strong>Reader app</strong> &mdash; find and save community resources near you.</li>
              <li><strong>Provider app</strong> &mdash; publish and manage resources, review AI-verified reports.</li>
            </ul>
          </li>
          <li>
            <span class="reader-signup">Reader: create an account (check spam for the verification email).</span><br>
            <span class="demo-login">Provider demo login: testb@example.com&nbsp; / &nbsp;DemoPass123!</span>
          </li>
        </ol>
      </section>

      <section class="expo-go" aria-labelledby="expo-go-heading">
        <h2 id="expo-go-heading">Expo Go</h2>
        <p>Once installed, open Expo Go once to confirm it launches. No login or configuration is needed. Open the built-in Camera app and point it at the QR code &mdash; a notification pops up, tap it to open your app in Expo Go; on Android, open the Expo Go app and tap the &ldquo;Scan QR Code&rdquo; button to use the in-app scanner. No account needed for either.</p>
      </section>

      <section class="endpoints" aria-labelledby="endpoints-heading">
        <h2 class="endpoints-label" id="endpoints-heading">PUBLIC ENDPOINTS</h2>
        <div class="endpoint-row">
          <div class="endpoint"><span class="verb">GET</span>/health</div>
          <div class="endpoint-description">Status check</div>
        </div>
        <div class="endpoint-row">
          <div class="endpoint"><span class="verb">GET</span>/resources</div>
          <div class="endpoint-description">Live resources</div>
        </div>
      </section>
    </main>
  </body>
</html>`;

app.get("/", (_req, res) => {
  return res.type("html").send(LANDING_PAGE_HTML);
});

// Health check — confirms the server is up
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const RESET_REQUEST_MESSAGE =
  "If that email is registered, a reset link is on its way.";

const providerPasswordResetDependencies = {
  generateCode: generateVerificationCode,
  findUserByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    }),
  saveResetToken: (userId: string, token: string, expiresAt: Date) =>
    prisma.resetToken.upsert({
      where: { token },
      create: { userId, token, expiresAt },
      update: { userId, expiresAt, usedAt: null },
    }),
  sendResetEmail: (email: string, token: string) =>
    sendPasswordResetEmail(email, token),
  findResetToken: (token: string) =>
    prisma.resetToken.findUnique({
      where: { token },
      select: { userId: true, expiresAt: true, usedAt: true },
    }),
  updatePassword: (userId: string, passwordHash: string) =>
    prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    }),
  consumeResetToken: (token: string) =>
    prisma.resetToken.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  invalidateSessions: (_userId: string): Promise<void> => Promise.resolve(),
};

app.post("/request-reset", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  try {
    const result = await requestPasswordReset(
      email,
      providerPasswordResetDependencies,
    );
    return res.json(result);
  } catch (error: unknown) {
    console.error("Provider password-reset request failed:", error);
    return res.json({ message: RESET_REQUEST_MESSAGE });
  }
});

app.post("/confirm-reset", async (req, res) => {
  const token = typeof req.body?.token === "string" ? req.body.token.trim() : "";
  const newPassword = typeof req.body?.newPassword === "string"
    ? req.body.newPassword
    : "";
  const passwordValidation = validatePassword(newPassword);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      success: false,
      error: passwordValidation.errors.join(" "),
    });
  }

  if (token.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Reset link is invalid or expired",
    });
  }

  try {
    const result = await confirmPasswordReset(
      { token, newPassword },
      providerPasswordResetDependencies,
    );

    return result.success
      ? res.json(result)
      : res.status(400).json({
        success: false,
        error: "Reset link is invalid or expired",
      });
  } catch (error: unknown) {
    console.error("Provider password-reset confirmation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to reset password",
    });
  }
});

const readerPasswordResetDependencies = {
  generateCode: generateVerificationCode,
  findUserByEmail: async (email: string) => {
    const reader = await prisma.reader.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    console.log(
      "[Narley] Reader password reset lookup:",
      reader === null ? "not found" : reader.id,
    );
    return reader;
  },
  saveResetToken: (readerId: string, token: string, expiresAt: Date) =>
    prisma.readerResetToken.upsert({
      where: { token },
      create: { readerId, token, expiresAt },
      update: { readerId, expiresAt, usedAt: null },
    }),
  sendResetEmail: async (email: string, token: string) => {
    console.log("[Narley] Calling Resend for reader password reset:", {
      recipient: email,
      from: "onboarding@resend.dev",
    });

    try {
      await sendReaderPasswordResetEmail(email, token);
      console.log("[Narley] Reader password reset Resend call completed successfully");
    } catch (error: unknown) {
      console.error("[Narley] Reader password reset Resend call failed:", error);
      throw error;
    }
  },
  findResetToken: async (token: string) => {
    const resetToken = await prisma.readerResetToken.findUnique({
      where: { token },
      select: { readerId: true, expiresAt: true, usedAt: true },
    });

    return resetToken === null
      ? null
      : {
        userId: resetToken.readerId,
        expiresAt: resetToken.expiresAt,
        usedAt: resetToken.usedAt,
      };
  },
  updatePassword: (readerId: string, passwordHash: string) =>
    prisma.reader.update({
      where: { id: readerId },
      data: { passwordHash },
    }),
  consumeResetToken: (token: string) =>
    prisma.readerResetToken.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  invalidateSessions: (_readerId: string): Promise<void> => Promise.resolve(),
};

app.post("/reader/request-reset", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  console.log("[Narley] /reader/request-reset email received:", email);

  try {
    const result = await requestPasswordReset(
      email,
      readerPasswordResetDependencies,
    );
    return res.json(result);
  } catch (error: unknown) {
    console.error("Reader password-reset request failed:", error);
    return res.json({ message: RESET_REQUEST_MESSAGE });
  }
});

app.post("/reader/confirm-reset", async (req, res) => {
  const token = typeof req.body?.token === "string" ? req.body.token.trim() : "";
  const newPassword = typeof req.body?.newPassword === "string"
    ? req.body.newPassword
    : "";
  const passwordValidation = validatePassword(newPassword);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      success: false,
      error: passwordValidation.errors.join(" "),
    });
  }

  if (token.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Reset link is invalid or expired",
    });
  }

  try {
    const result = await confirmPasswordReset(
      { token, newPassword },
      readerPasswordResetDependencies,
    );

    return result.success
      ? res.json(result)
      : res.status(400).json({
        success: false,
        error: "Reset link is invalid or expired",
      });
  } catch (error: unknown) {
    console.error("Reader password-reset confirmation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to reset password",
    });
  }
});

type ReaderReport = {
  resourceId: string;
  address: string;
  reason: string;
};

const WEBSITE_REPORT_REASON = "Wrong website or website not working";

const parseReaderReport = (value: unknown): ReaderReport | null => {
  if (!isRecord(value)) {
    return null;
  }

  const fields = [value.resourceId, value.address, value.reason];

  if (!fields.every((field) => typeof field === "string" && field.trim().length > 0)) {
    return null;
  }

  return {
    resourceId: String(value.resourceId).trim(),
    address: String(value.address).trim(),
    reason: String(value.reason).trim(),
  };
};

app.post("/reports", async (req, res) => {
  const report = parseReaderReport(req.body);

  if (report === null) {
    return res.status(400).json({ error: "resourceId, address, and reason are required" });
  }

  const alertCreation: {
    promise: ReturnType<typeof prisma.providerAlert.create> | null;
  } = { promise: null };

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: report.resourceId },
      select: { title: true, phone: true, website: true },
    });

    if (resource === null) {
      return res.status(404).json({ ok: false, error: "Resource not found" });
    }

    const websiteObservation = report.reason === WEBSITE_REPORT_REASON
      ? toWebsiteCheckObservation(await checkWebsite(resource.website ?? ""))
      : undefined;

    const result = await verifyReaderReport(report, {
      callOpenAI: (readerReport) =>
        callOpenAI({
          ...readerReport,
          title: resource.title,
          ...(resource.phone !== null ? { phone: resource.phone } : {}),
          ...(resource.website !== null ? { website: resource.website } : {}),
          ...(websiteObservation !== undefined ? { websiteObservation } : {}),
        }),
      createProviderAlert: (alert) => {
        alertCreation.promise = prisma.providerAlert.create({
          data: {
            kind: "report",
            resourceId: alert.resourceId,
            resourceTitle: resource.title,
            address: alert.address,
            reason: alert.report.reason,
            findings: alert.findings,
            confidence: alert.confidence,
            uncertain: alert.uncertain,
            sources: alert.sources.map(({ url }) => url),
          },
        });

        return alertCreation.promise;
      },
    });

    if (!result.ok || alertCreation.promise === null) {
      return res.status(422).json({ ok: false, error: "Report could not be verified" });
    }

    await alertCreation.promise;
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "Unable to verify report" });
  }
});

type ProviderReportBody = {
  resourceTitle: string;
  address: string;
  phone?: string;
  website?: string;
  details: string;
};

const parseProviderReportBody = (value: unknown): ProviderReportBody | null => {
  if (!isRecord(value)) {
    return null;
  }

  const { resourceTitle, address, phone, website, details } = value;

  if (
    typeof resourceTitle !== "string" ||
    typeof address !== "string" ||
    typeof details !== "string" ||
    (phone !== undefined && typeof phone !== "string") ||
    (website !== undefined && typeof website !== "string")
  ) {
    return null;
  }

  return {
    resourceTitle,
    address,
    details,
    ...(phone === undefined ? {} : { phone }),
    ...(website === undefined ? {} : { website }),
  };
};

app.post("/provider/report", requireAuth("provider"), async (req, res) => {
  const reportBody = parseProviderReportBody(req.body);
  const auth = req.auth;

  if (auth === undefined) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  if (reportBody === null) {
    return res.status(400).json({ ok: false, error: "All report fields are required" });
  }

  try {
    const result = await submitProviderReport({
      ...reportBody,
      reportedBy: auth.userId,
    }, {
      sendToNarleyAdmin: sendProviderReportEmail,
    });

    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  } catch (error: unknown) {
    console.error("Unable to send provider report:", error);
    return res.status(500).json({ ok: false, error: "Unable to send report to Narley" });
  }
});

app.get("/provider/alerts", requireAuth("provider"), async (req, res) => {
  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const membership = resolveProviderMembership(
      await loadProviderMembership(auth.userId),
    );

    if (membership === null) {
      return res.status(403).json({
        alerts: [],
        error: "Provider membership is required",
      });
    }

    const resources = await prisma.resource.findMany({
      where: { organizationId: membership.organizationId },
      select: { id: true, title: true },
    });
    const resourceIds = resources.map(({ id }) => id);
    const alerts = await prisma.providerAlert.findMany({
      where: {
        kind: "report",
        resourceId: { in: resourceIds },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        kind: true,
        resourceId: true,
        resourceTitle: true,
        address: true,
        reason: true,
        findings: true,
        confidence: true,
        uncertain: true,
        sources: true,
        createdAt: true,
      },
    });

    const resourceTitles = new Map(
      resources.map((resource) => [resource.id, resource.title]),
    );
    const alertsWithTitles = alerts.map((alert) => ({
      ...alert,
      resourceTitle: alert.resourceTitle ??
        (alert.resourceId === null ? null : resourceTitles.get(alert.resourceId) ?? null),
    }));

    return res.json({ alerts: alertsWithTitles });
  } catch {
    return res.status(500).json({
      alerts: [],
      error: "Unable to load provider alerts",
    });
  }
});

app.delete("/provider/alerts/:id", requireAuth("provider"), async (req, res) => {
  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const alert = await prisma.providerAlert.findUnique({
      where: { id: req.params.id },
      select: { id: true, resourceId: true },
    });

    if (alert === null) {
      return res.status(404).json({
        ok: false,
        error: "Provider alert not found",
      });
    }

    const membership = resolveProviderMembership(
      await loadProviderMembership(auth.userId),
    );
    const resource = alert.resourceId === null
      ? null
      : await prisma.resource.findUnique({
          where: { id: alert.resourceId },
          select: { organizationId: true },
        });

    if (!providerOwnsResource(
      { organizationId: membership?.organizationId ?? null },
      { organizationId: resource?.organizationId ?? null },
    )) {
      return res.status(403).json({
        ok: false,
        error: "You can only delete your own organization's alerts",
      });
    }

    await prisma.providerAlert.delete({
      where: { id: alert.id },
    });

    return res.json({ ok: true });
  } catch (error: unknown) {
    console.error("Unable to delete provider alert:", error);
    return res.status(500).json({
      ok: false,
      error: "Unable to delete provider alert",
    });
  }
});

// POST /login — wires the tested login() to a real Prisma lookup
app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const result = await login(
    { email, password },
    {
      findUserByEmail: async (lookupEmail) =>
        prisma.user.findUnique({ where: { email: lookupEmail } }),
    },
  );

  if (result.error || result.session === undefined) {
    return res.status(401).json({ error: result.error });
  }

  const token = signAuthToken({
    userId: result.session.userId,
    type: "provider",
  });
  return res.json({ session: result.session, token });
});

type ReaderAuthCredentials = {
  email: string;
  password: string;
};

const parseReaderAuthCredentials = (
  value: unknown,
): ReaderAuthCredentials | null => {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.email !== "string" || typeof value.password !== "string") {
    return null;
  }

  return {
    email: value.email,
    password: value.password,
  };
};

app.post("/reader/signup", async (req, res) => {
  const credentials = parseReaderAuthCredentials(req.body);

  if (credentials === null) {
    return res.status(400).json({
      ok: false,
      error: "Email and password are required",
    });
  }

  try {
    const result = await readerSignup(credentials, {
      validatePassword,
      findUserByEmail: async (email) =>
        prisma.reader.findUnique({ where: { email } }),
      hashPassword: async (password) => bcrypt.hash(password, 12),
      createUser: async ({ email, passwordHash }) =>
        prisma.reader.create({
          data: {
            email,
            passwordHash,
            emailVerified: false,
          },
          select: {
            id: true,
            email: true,
            emailVerified: true,
          },
        }),
    });

    if (!result.ok) {
      const status = result.error === "An account with this email already exists"
        ? 409
        : 400;
      return res.status(status).json(result);
    }

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationCode.create({
      data: {
        email: credentials.email,
        code,
        expiresAt,
        usedAt: null,
      },
    });
    await sendVerificationEmail(credentials.email, code);

    return res.status(201).json(result);
  } catch {
    return res.status(500).json({
      ok: false,
      error: "Unable to create reader account",
    });
  }
});

type ReaderVerificationRequest = {
  email: string;
  code: string;
};

const parseReaderVerificationRequest = (
  value: unknown,
): ReaderVerificationRequest | null => {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.email !== "string" || typeof value.code !== "string") {
    return null;
  }

  return {
    email: value.email,
    code: value.code,
  };
};

app.post("/reader/verify", async (req, res) => {
  const input = parseReaderVerificationRequest(req.body);

  if (input === null) {
    return res.status(400).json({ ok: false });
  }

  try {
    const result = await verifyReaderEmailCode(input, {
      findCode: async (email, code) =>
        prisma.verificationCode.findFirst({
          where: { email, code },
          orderBy: { createdAt: "desc" },
        }),
      markEmailVerified: async (email) => {
        await prisma.reader.update({
          where: { email },
          data: { emailVerified: true },
        });
      },
      consumeCode: async (email, code) => {
        await prisma.verificationCode.updateMany({
          where: { email, code },
          data: { usedAt: new Date() },
        });
      },
    });

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch {
    return res.status(500).json({
      ok: false,
      error: "Unable to verify reader email",
    });
  }
});

app.post("/reader/login", async (req, res) => {
  const credentials = parseReaderAuthCredentials(req.body);

  if (credentials === null) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await readerLogin(credentials, {
      findUserByEmail: async (email) =>
        prisma.reader.findUnique({ where: { email } }),
      verifyPassword: async (password, passwordHash) =>
        bcrypt.compare(password, passwordHash),
    });

    if (result.error !== undefined || result.session === undefined) {
      return res.status(401).json({ error: result.error });
    }

    const token = signAuthToken({
      userId: result.session.userId,
      type: "reader",
    });
    return res.json({ session: result.session, token });
  } catch {
    return res.status(500).json({ error: "Unable to log in reader" });
  }
});

type SavedResourceRequest = {
  resource: {
    resourceId: string;
    title: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    notes?: string;
    status?: string;
  };
};

const parseSavedResourceRequest = (
  value: unknown,
): SavedResourceRequest | null => {
  if (!isRecord(value) || !isRecord(value.resource)) {
    return null;
  }

  const resource = value.resource;

  if (
    typeof resource.resourceId !== "string" ||
    typeof resource.title !== "string" ||
    typeof resource.category !== "string" ||
    typeof resource.address !== "string" ||
    typeof resource.latitude !== "number" ||
    !Number.isFinite(resource.latitude) ||
    typeof resource.longitude !== "number" ||
    !Number.isFinite(resource.longitude) ||
    (resource.notes !== undefined && typeof resource.notes !== "string") ||
    (resource.status !== undefined && typeof resource.status !== "string")
  ) {
    return null;
  }

  return {
    resource: {
      resourceId: resource.resourceId,
      title: resource.title,
      category: resource.category,
      address: resource.address,
      latitude: resource.latitude,
      longitude: resource.longitude,
      ...(typeof resource.notes === "string" ? { notes: resource.notes } : {}),
      ...(typeof resource.status === "string" ? { status: resource.status } : {}),
    },
  };
};

app.post("/reader/saved", requireAuth("reader"), async (req, res) => {
  const request = parseSavedResourceRequest(req.body);

  if (request === null) {
    return res.status(400).json({ error: "Invalid saved resource data" });
  }

  const auth = req.auth;

  if (auth === undefined) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const data = {
    readerId: auth.userId,
    ...request.resource,
  };

  try {
    try {
      const savedResource = await prisma.savedResource.create({ data });
      return res.status(201).json({ savedResource });
    } catch (error: unknown) {
      const existingSavedResource = await prisma.savedResource.findUnique({
        where: {
          readerId_resourceId: {
            readerId: auth.userId,
            resourceId: request.resource.resourceId,
          },
        },
      });

      if (existingSavedResource !== null) {
        return res.json({ savedResource: existingSavedResource });
      }

      throw error;
    }
  } catch {
    return res.status(500).json({ error: "Unable to save resource" });
  }
});

app.get("/reader/saved", requireAuth("reader"), async (req, res) => {
  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const savedResources = await prisma.savedResource.findMany({
      where: { readerId: auth.userId },
      orderBy: { savedAt: "desc" },
    });
    return res.json({ savedResources });
  } catch {
    return res.status(500).json({ error: "Unable to load saved resources" });
  }
});

app.delete("/reader/saved/:id", requireAuth("reader"), async (req, res) => {
  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const savedResource = await prisma.savedResource.findUnique({
      where: { id: req.params.id },
      select: { id: true, readerId: true },
    });

    if (savedResource === null) {
      return res.status(404).json({ error: "Saved resource not found" });
    }

    if (savedResource.readerId !== auth.userId) {
      return res.status(403).json({
        error: "You can only delete your own saved resources",
      });
    }

    await prisma.savedResource.delete({ where: { id: savedResource.id } });
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to delete saved resource" });
  }
});

type ResourceRequest = {
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  phone?: string;
  website?: string;
  notes: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readOptionalString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const parseResourceRequest = (value: unknown): ResourceRequest | null => {
  if (!isRecord(value)) {
    return null;
  }

  const expiresAt = new Date(
    typeof value.expiresAt === "string" ? value.expiresAt : Number.NaN,
  );

  if (
    typeof value.title !== "string" ||
    typeof value.category !== "string" ||
    typeof value.address !== "string" ||
    typeof value.latitude !== "number" ||
    typeof value.longitude !== "number"
  ) {
    return null;
  }

  return {
    title: value.title,
    category: value.category,
    address: value.address,
    latitude: value.latitude,
    longitude: value.longitude,
    expiresAt,
    phone: readOptionalString(value.phone),
    website: readOptionalString(value.website),
    notes: typeof value.notes === "string" ? value.notes : "",
  };
};

app.post("/resources", requireAuth("provider"), async (req, res) => {
  const request = parseResourceRequest(req.body);

  if (request === null) {
    return res.status(400).json({ error: "Invalid resource data" });
  }

  const resourceInput = {
    title: request.title,
    category: request.category,
    address: request.address,
    latitude: request.latitude,
    longitude: request.longitude,
    expiresAt: request.expiresAt,
    phone: request.phone,
    website: request.website,
  };
  const creation: {
    resource: Awaited<ReturnType<typeof prisma.resource.create>> | null;
  } = { resource: null };

  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const membership = resolveProviderMembership(
      await loadProviderMembership(auth.userId),
    );
    const result = await createResource(
      resourceInput,
      { id: auth.userId },
      {
        membership,
        findActiveByTitleAndAddress: async (title, address) =>
          prisma.resource.findFirst({
            where: { title, address, status: "ACTIVE" },
          }),
        insert: async (resource) => {
          if (membership === null) {
            throw new Error("Provider membership is required");
          }

          creation.resource = await prisma.resource.create({
            data: {
              title: resource.title,
              category: request.category,
              address: resource.address,
              latitude: request.latitude,
              longitude: request.longitude,
              expiresAt: request.expiresAt,
              status: "ACTIVE",
              phone: request.phone,
              website: request.website,
              notes: request.notes,
              providerId: resource.providerId,
              organizationId: membership.organizationId,
            },
          });

          return { id: creation.resource.id };
        },
        recordAuditEvent: async (event) => prisma.auditEvent.create({ data: event }),
      },
    );

    if (!result.ok) {
      const status = result.error.includes("Duplicate")
        ? 409
        : result.error.includes("Provider") || result.error.includes("authorized")
          ? 403
          : 400;
      return res.status(status).json({ error: result.error });
    }

    if (creation.resource === null) {
      return res.status(500).json({ error: "Resource was not created" });
    }

    return res.status(201).json({ resource: toApiResource(creation.resource) });
  } catch {
    return res.status(500).json({ error: "Unable to create resource" });
  }
});

app.get("/resources", async (_req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        status: "ACTIVE",
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "asc" },
    });

    return res.json({
      resources: resources.map(toApiResource),
    });
  } catch {
    return res.status(500).json({ error: "Unable to load resources" });
  }
});

const parseResourceChanges = (
  value: unknown,
): Record<string, unknown> | null => {
  if (!isRecord(value)) {
    return null;
  }

  const changes: Record<string, unknown> = {};

  for (const field of ["title", "category", "address", "phone", "website", "notes"] as const) {
    if (typeof value[field] === "string" || value[field] === null) {
      changes[field] = value[field];
    }
  }

  for (const field of ["latitude", "longitude"] as const) {
    if (typeof value[field] === "number") {
      changes[field] = value[field];
    }
  }

  if (Object.prototype.hasOwnProperty.call(value, "expiresAt")) {
    changes.expiresAt = new Date(
      typeof value.expiresAt === "string" ? value.expiresAt : Number.NaN,
    );
  }

  return changes;
};

app.patch("/resources/:id", requireAuth("provider"), async (req, res) => {
  const resourceId = req.params.id;
  const changes = parseResourceChanges(req.body);

  if (changes === null) {
    return res.status(400).json({ error: "Invalid resource changes" });
  }

  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const currentResource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (currentResource === null) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const membership = resolveProviderMembership(
      await loadProviderMembership(auth.userId),
    );

    if (!providerOwnsResource(
      { organizationId: membership?.organizationId ?? null },
      { organizationId: currentResource.organizationId },
    )) {
      return res.status(403).json({
        error: "You can only edit your own organization's resources",
      });
    }

    const updateResult: {
      resource: Awaited<ReturnType<typeof prisma.resource.update>> | null;
    } = { resource: null };
    const result = await updateResource(resourceId, changes, {
      resource: { organizationId: currentResource.organizationId },
      membership,
      update: async (id, approvedChanges) => {
        const data = {
          ...(typeof approvedChanges.title === "string"
            ? { title: approvedChanges.title }
            : {}),
          ...(typeof approvedChanges.category === "string"
            ? { category: approvedChanges.category }
            : {}),
          ...(typeof approvedChanges.address === "string"
            ? { address: approvedChanges.address }
            : {}),
          ...(typeof approvedChanges.latitude === "number"
            ? { latitude: approvedChanges.latitude }
            : {}),
          ...(typeof approvedChanges.longitude === "number"
            ? { longitude: approvedChanges.longitude }
            : {}),
          ...(approvedChanges.expiresAt instanceof Date
            ? { expiresAt: approvedChanges.expiresAt }
            : {}),
          ...(typeof approvedChanges.phone === "string" || approvedChanges.phone === null
            ? { phone: approvedChanges.phone }
            : {}),
          ...(typeof approvedChanges.website === "string" || approvedChanges.website === null
            ? { website: approvedChanges.website }
            : {}),
          ...(typeof approvedChanges.notes === "string"
            ? { notes: approvedChanges.notes }
            : {}),
        };
        updateResult.resource = await prisma.resource.update({
          where: { id },
          data,
        });
        return updateResult.resource;
      },
      insert: async () => undefined,
      recordAuditEvent: async (event) => prisma.auditEvent.create({
        data: { ...event, providerId: currentResource.providerId },
      }),
      findActiveByTitleAndAddress: async (title, address) =>
        prisma.resource.findFirst({
          where: {
            title,
            ...(address === undefined ? {} : { address }),
            status: "ACTIVE",
          },
        }),
    });

    if (!result.ok) {
      const status = result.error.includes("authorized")
        ? 403
        : result.error.includes("Duplicate")
          ? 409
          : 400;
      return res.status(status).json({ error: result.error });
    }

    if (updateResult.resource === null) {
      return res.status(500).json({ error: "Resource was not updated" });
    }

    return res.json({ resource: toApiResource(updateResult.resource) });
  } catch {
    return res.status(500).json({ error: "Unable to update resource" });
  }
});

app.delete("/resources/:id", requireAuth("provider"), async (req, res) => {
  const resourceId = req.params.id;

  try {
    const auth = req.auth;

    if (auth === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const currentResource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: { id: true, organizationId: true },
    });

    if (currentResource === null) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const membership = resolveProviderMembership(
      await loadProviderMembership(auth.userId),
    );

    if (!providerOwnsResource(
      { organizationId: membership?.organizationId ?? null },
      { organizationId: currentResource.organizationId },
    )) {
      return res.status(403).json({
        error: "You can only delete your own organization's resources",
      });
    }

    await prisma.resource.update({
      where: { id: resourceId },
      data: { status: "EXPIRED" },
    });

    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to delete resource" });
  }
});

app.use((_req, res) => {
  return res.status(404).json({ error: "API endpoint not found" });
});

const jsonErrorHandler: ErrorRequestHandler = (_error, _req, res, _next) => {
  res.status(500).json({ error: "Internal server error" });
};

app.use(jsonErrorHandler);

const PORT = 4000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Narley API running on http://localhost:${PORT}`);
  });
}

export default app;
