import { describe, expect, it } from "vitest";
import { getTheme } from "@shared-ui/theme/theme";

describe("shared UI theme import", () => {
  it("resolves the shared theme through the monorepo alias", () => {
    expect(getTheme(false).colors.primary).toBe("#0F4D35");
  });
});
