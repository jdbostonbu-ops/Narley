import {
  verifyAuthToken,
  type AuthTokenPayload,
  type VerifiedAuthClaims,
} from "./authToken";

export const authenticateRequest = (
  authHeader: string | undefined,
  requiredType?: AuthTokenPayload["type"],
): VerifiedAuthClaims => {
  const bearerMatch = authHeader?.match(/^Bearer ([^\s]+)$/);

  if (bearerMatch === undefined || bearerMatch === null) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = bearerMatch[1];

  if (token === undefined) {
    throw new Error("Missing or invalid Authorization header");
  }

  const claims = verifyAuthToken(token);

  if (requiredType !== undefined && claims.type !== requiredType) {
    throw new Error("Wrong account type");
  }

  return claims;
};
