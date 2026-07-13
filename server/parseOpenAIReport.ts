export type OpenAIReportResult = {
  findings: string;
  confidence: string;
  sources: Array<{ url?: string }>;
};

const INVALID_RESULT: OpenAIReportResult = {
  findings: "",
  confidence: "",
  sources: [],
};

const CONFIDENCE_VALUES = ["high", "medium", "low"] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasExactKeys = (value: Record<string, unknown>, keys: readonly string[]): boolean => {
  const valueKeys = Object.keys(value);
  return valueKeys.length === keys.length && keys.every((key) => valueKeys.includes(key));
};

const isConfidence = (value: unknown): value is "high" | "medium" | "low" =>
  typeof value === "string" && CONFIDENCE_VALUES.some((confidence) => confidence === value);

const isSource = (value: unknown): value is { url: string } =>
  isRecord(value) &&
  hasExactKeys(value, ["url"]) &&
  typeof value.url === "string" &&
  value.url.trim().length > 0;

export const parseOpenAIReport = (content: string): OpenAIReportResult => {
  try {
    const parsed: unknown = JSON.parse(content);

    if (
      !isRecord(parsed) ||
      !hasExactKeys(parsed, ["findings", "confidence", "sources"]) ||
      typeof parsed.findings !== "string" ||
      parsed.findings.trim().length === 0 ||
      !isConfidence(parsed.confidence) ||
      !Array.isArray(parsed.sources) ||
      !parsed.sources.every(isSource)
    ) {
      return INVALID_RESULT;
    }

    return {
      findings: parsed.findings.trim(),
      confidence: parsed.confidence,
      sources: parsed.sources.map(({ url }) => ({ url })),
    };
  } catch {
    return INVALID_RESULT;
  }
};
