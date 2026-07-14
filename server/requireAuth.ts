import type { RequestHandler } from "express";

import { authenticateRequest } from "./authenticateRequest";
import type {
  AuthTokenPayload,
  VerifiedAuthClaims,
} from "./authToken";

declare global {
  namespace Express {
    interface Request {
      auth?: VerifiedAuthClaims;
    }
  }
}

export const requireAuth = (
  requiredType?: AuthTokenPayload["type"],
): RequestHandler =>
  (req, res, next) => {
    try {
      req.auth = authenticateRequest(
        req.headers.authorization,
        requiredType,
      );
      next();
    } catch {
      res.status(401).json({ error: "Unauthorized" });
    }
  };
