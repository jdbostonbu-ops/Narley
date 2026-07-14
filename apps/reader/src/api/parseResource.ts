export type ApiResource = {
  id: string;
  title: string;
  category: string;
  status: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  notes: string;
  phone?: string;
  website?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const parseResource = (value: unknown): ApiResource | null => {
  if (!isRecord(value)) {
    return null;
  }

  const expiresAt = new Date(
    typeof value.expiresAt === "string" ? value.expiresAt : Number.NaN,
  );

  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.category !== "string" ||
    typeof value.status !== "string" ||
    typeof value.address !== "string" ||
    typeof value.latitude !== "number" ||
    !Number.isFinite(value.latitude) ||
    typeof value.longitude !== "number" ||
    !Number.isFinite(value.longitude) ||
    Number.isNaN(expiresAt.getTime()) ||
    typeof value.notes !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    title: value.title,
    category: value.category,
    status: value.status,
    address: value.address,
    latitude: value.latitude,
    longitude: value.longitude,
    expiresAt,
    notes: value.notes,
  };
};
