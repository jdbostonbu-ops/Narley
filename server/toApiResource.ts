type DbResource = {
  id: string;
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  status: string;
  phone: string | null;
  website: string | null;
  notes: string;
  organizationId: string;
};

type ApiResource = {
  id: string;
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  status: string;
  phone: string | undefined;
  website: string | undefined;
  notes: string;
  organizationId: string;
};

export const toApiResource = (resource: DbResource): ApiResource => ({
  id: resource.id,
  title: resource.title,
  category: resource.category,
  address: resource.address,
  latitude: resource.latitude,
  longitude: resource.longitude,
  expiresAt: resource.expiresAt,
  status: resource.status,
  phone: resource.phone ?? undefined,
  website: resource.website ?? undefined,
  notes: resource.notes,
  organizationId: resource.organizationId,
});
