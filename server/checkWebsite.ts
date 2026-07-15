import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

import { toWebsiteCheckResult } from "./toWebsiteCheckResult";
import type { WebsiteCheckResult } from "./websiteCheckObservation";

const WEBSITE_CHECK_TIMEOUT_MS = 5_000;
const MAX_REDIRECTS = 10;

const isPrivateIpv4 = (address: string): boolean => {
  const octets = address.split(".").map(Number);

  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) {
    return true;
  }

  const [first = 0, second = 0] = octets;

  return first === 0
    || first === 10
    || first === 127
    || (first === 100 && second >= 64 && second <= 127)
    || (first === 169 && second === 254)
    || (first === 172 && second >= 16 && second <= 31)
    || (first === 192 && second === 168)
    || (first === 198 && (second === 18 || second === 19))
    || first >= 224;
};

const isPrivateIpv6 = (address: string): boolean => {
  const normalized = address.toLocaleLowerCase();
  const mappedIpv4 = normalized.startsWith("::ffff:")
    ? normalized.slice("::ffff:".length)
    : null;

  if (mappedIpv4 !== null && isIP(mappedIpv4) === 4) {
    return isPrivateIpv4(mappedIpv4);
  }

  return normalized === "::"
    || normalized === "::1"
    || normalized.startsWith("fc")
    || normalized.startsWith("fd")
    || normalized.startsWith("fe8")
    || normalized.startsWith("fe9")
    || normalized.startsWith("fea")
    || normalized.startsWith("feb");
};

const isPrivateAddress = (address: string): boolean => {
  const family = isIP(address);

  if (family === 4) {
    return isPrivateIpv4(address);
  }

  if (family === 6) {
    return isPrivateIpv6(address);
  }

  return true;
};

const throwWhenAborted = (signal: AbortSignal): Promise<never> =>
  new Promise((_, reject) => {
    if (signal.aborted) {
      reject(signal.reason);
      return;
    }

    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });

const isPublicDestination = async (
  url: URL,
  signal: AbortSignal,
): Promise<boolean> => {
  const hostname = url.hostname.replace(/^\[|\]$/g, "").toLocaleLowerCase();

  if (
    hostname === "localhost"
    || hostname.endsWith(".localhost")
    || url.username.length > 0
    || url.password.length > 0
  ) {
    return false;
  }

  const literalFamily = isIP(hostname);

  if (literalFamily !== 0) {
    return !isPrivateAddress(hostname);
  }

  const addresses = await Promise.race([
    lookup(hostname, { all: true, verbatim: true }),
    throwWhenAborted(signal),
  ]);

  return addresses.length > 0
    && addresses.every(({ address }) => !isPrivateAddress(address));
};

const isRedirectStatus = (status: number): boolean =>
  status === 301
  || status === 302
  || status === 303
  || status === 307
  || status === 308;

const requestWebsite = async (
  initialUrl: URL,
  signal: AbortSignal,
): Promise<WebsiteCheckResult> => {
  let currentUrl = initialUrl;

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    if (!await isPublicDestination(currentUrl, signal)) {
      return "could-not-reach";
    }

    const response = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      signal,
    });

    if (!isRedirectStatus(response.status)) {
      await response.body?.cancel();
      return toWebsiteCheckResult(response.status);
    }

    const location = response.headers.get("location");
    await response.body?.cancel();

    if (location === null || redirectCount === MAX_REDIRECTS) {
      return location === null ? "reached-not-404" : "could-not-reach";
    }

    currentUrl = new URL(location, currentUrl);

    if (currentUrl.protocol !== "http:" && currentUrl.protocol !== "https:") {
      return "could-not-reach";
    }
  }

  return "could-not-reach";
};

export const checkWebsite = async (website: string): Promise<WebsiteCheckResult> => {
  let url: URL;

  try {
    url = new URL(website);
  } catch {
    return "could-not-reach";
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "could-not-reach";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBSITE_CHECK_TIMEOUT_MS);

  try {
    return await requestWebsite(url, controller.signal);
  } catch {
    return "could-not-reach";
  } finally {
    clearTimeout(timeout);
  }
};
