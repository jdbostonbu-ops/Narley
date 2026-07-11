import { validateAiResult } from "./validateAiResult";

type ReaderReport = {
  resourceId: string;
  address: string;
  reason: string;
};

type AiResult = {
  findings: string;
  confidence: string;
  sources: readonly { url?: string }[];
};

type ProviderAlert = {
  report: ReaderReport;
  resourceId: string;
  address: string;
  findings: string;
  confidence: string;
  sources: Array<{ url: string }>;
  uncertain: boolean;
};

type VerifyReaderReportDependencies = {
  callOpenAI: (report: ReaderReport) => Promise<AiResult>;
  createProviderAlert: (alert: ProviderAlert) => unknown;
};

export const verifyReaderReport = async (
  report: ReaderReport,
  { callOpenAI, createProviderAlert }: VerifyReaderReportDependencies
): Promise<{ ok: boolean }> => {
  const aiResult = await callOpenAI(report);
  const validation = validateAiResult(aiResult);

  if (!validation.ok) {
    return { ok: false };
  }

  createProviderAlert({
    report,
    resourceId: report.resourceId,
    address: report.address,
    findings: aiResult.findings,
    confidence: aiResult.confidence,
    sources: validation.sources,
    uncertain: validation.uncertain,
  });

  return { ok: true };
};
