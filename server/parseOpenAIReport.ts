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
      const failures: string[] = [];

      if (!isRecord(parsed)) {
        failures.push("response is not a JSON object");
      } else {
        if (!hasExactKeys(parsed, ["findings", "confidence", "sources"])) {
          failures.push(
            `expected exactly findings, confidence, and sources; received keys: ${Object.keys(parsed).join(", ")}`,
          );
        }

        if (typeof parsed.findings !== "string") {
          failures.push("findings is missing or is not a string");
        } else if (parsed.findings.trim().length === 0) {
          failures.push("findings is empty");
        }

        if (!isConfidence(parsed.confidence)) {
          failures.push(
            `confidence must be high, medium, or low; received: ${String(parsed.confidence)}`,
          );
        }

        if (!Array.isArray(parsed.sources)) {
          failures.push("sources is missing or is not an array");
        } else if (!parsed.sources.every(isSource)) {
          failures.push("one or more sources is not an exact object with a non-empty url");
        }
      }

      console.error("[Narley] OpenAI report parsing rejected the response:", {
        failures,
        rawContent: content,
      });
      return INVALID_RESULT;
    }

    console.log("[Narley] OpenAI report parsing succeeded");
    return {
      findings: parsed.findings.trim(),
      confidence: parsed.confidence,
      sources: parsed.sources.map(({ url }) => ({ url })),
    };
  } catch (error: unknown) {
    console.error("[Narley] OpenAI report parsing failed because JSON is invalid:", {
      error,
      rawContent: content,
    });
    return INVALID_RESULT;
  }
};
