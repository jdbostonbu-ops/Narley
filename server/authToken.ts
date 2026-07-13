import "dotenv/config";
import jwt, { type JwtPayload } from "jsonwebtoken";

export type AuthTokenPayload = {
  userId: string;
  type: "provider" | "reader";
};

export type VerifiedAuthClaims = JwtPayload & AuthTokenPayload;

const jwtSecret = process.env.JWT_SECRET;

if (typeof jwtSecret !== "string" || jwtSecret.length === 0) {
  throw new Error("JWT_SECRET is not set");
}

export const signAuthToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

export const verifyAuthToken = (token: string): VerifiedAuthClaims => {
  const claims = jwt.verify(token, jwtSecret, {
    algorithms: ["HS256"],
  });

  if (
    typeof claims === "string" ||
    typeof claims.userId !== "string" ||
    (claims.type !== "provider" && claims.type !== "reader")
  ) {
    throw new Error("Invalid authentication token claims");
  }

  return {
    ...claims,
    userId: claims.userId,
    type: claims.type,
  };
};
