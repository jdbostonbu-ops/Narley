import { describe, it, expect } from "vitest";

import { toWebsiteCheckResult } from "./toWebsiteCheckResult";

describe("website check result from status (REPORT-000)", () => {
  it("reports a 404 as a verified missing page", () => {
    expect(toWebsiteCheckResult(404)).toBe("404");
  });

  it("does not claim a 403 was reached, because the server refused the check", () => {
    expect(toWebsiteCheckResult(403)).toBe("could-not-reach");
  });

  it("reports a 200 as reached and not a 404", () => {
    expect(toWebsiteCheckResult(200)).toBe("reached-not-404");
  });
})
