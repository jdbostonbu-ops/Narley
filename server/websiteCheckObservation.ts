export type WebsiteCheckResult =
  | "404"
  | "reached-not-404"
  | "could-not-reach";

export const toWebsiteCheckObservation = (
  result: WebsiteCheckResult
): string => {
  if (result === "404") {
    return "The server requested this website and it returned 404 — the page does not exist. Check whether the pinned website is the one you intended; a typo can produce a 404. If the address is right, the page is gone and the pin needs updating.";
  }

  if (result === "reached-not-404") {
    return "The server requested this website and it did not return a 404. Check whether the pinned website is the one you intended — a typo can still load a working page. If the URL is correct, consider adding a note to the card for readers, such as recommending they copy and paste the address.";
  }

  return "I couldn't reach this website to check it. That might mean the site blocks automated checks and works fine in a browser — or it might mean the site is genuinely broken. I can't tell which from here. Please open the link yourself to see.";
};
