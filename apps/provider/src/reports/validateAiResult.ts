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

  return { ok, uncertain, sources };
};
