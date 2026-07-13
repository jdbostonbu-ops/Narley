type AiSource = {
  url?: string;
};

type AiResult = {
  findings: string;
  confidence: string;
  sources: readonly AiSource[];
};

type ValidSource = {
  url: string;
};

type ValidatedAiResult = {
  ok: boolean;
  uncertain: boolean;
  sources: ValidSource[];
};

const CONFIDENCE_LABELS = ["high", "medium", "low"] as const;

export const validateAiResult = (result: AiResult): ValidatedAiResult => {
  const sources = result.sources
    .filter((source): source is ValidSource =>
      typeof source.url === "string" && source.url.trim() !== ""
    )
    .slice(0, 3);
  const hasValidConfidence = CONFIDENCE_LABELS.some(
    (confidence) => confidence === result.confidence
  );
  const ok = result.findings.trim() !== "" && hasValidConfidence;
  const uncertain = result.confidence === "low" || sources.length === 0;

  if (!ok) {
    const failures: string[] = [];

    if (result.findings.trim() === "") {
      failures.push("findings is empty");
    }

    if (!hasValidConfidence) {
      failures.push(
        `confidence must be high, medium, or low; received: ${result.confidence}`,
      );
    }

    console.error("[Narley] OpenAI report validation rejected the parsed result:", {
      failures,
      result,
    });
  } else {
    console.log("[Narley] OpenAI report validation succeeded:", {
      confidence: result.confidence,
      sourceCount: sources.length,
      uncertain,
    });
  }

  return { ok, uncertain, sources };
};
