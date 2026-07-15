import { describe, it, expect } from "vitest";

import { toWebsiteCheckObservation } from "./websiteCheckObservation";

describe("website check observation (REPORT-000)", () => {
  it("reports a verified 404 and warns that a typo can produce one", () => {
    expect(toWebsiteCheckObservation("404")).toBe(
      "The server requested this website and it returned 404 — the page does not exist. Check whether the pinned website is the one you intended; a typo can produce a 404. If the address is right, the page is gone and the pin needs updating."
    );
  });

  it("reports that no 404 was received and suggests a note for readers", () => {
    expect(toWebsiteCheckObservation("reached-not-404")).toBe(
      "The server requested this website and it did not return a 404. Check whether the pinned website is the one you intended — a typo can still load a working page. If the URL is correct, consider adding a note to the card for readers, such as recommending they copy and paste the address."
    );
  });

  it("does not claim the site is broken when the server could not reach it", () => {
    expect(toWebsiteCheckObservation("could-not-reach")).toBe(
      "I couldn't reach this website to check it. That might mean the site blocks automated checks and works fine in a browser — or it might mean the site is genuinely broken. I can't tell which from here. Please open the link yourself to see."
    );
  });
})
