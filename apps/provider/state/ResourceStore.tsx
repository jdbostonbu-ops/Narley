import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  deleteResource,
  getResources,
  patchResource,
  postResource,
  type CreateResourcePayload,
  type UpdateResourcePayload,
} from "../src/api/client";

export type StoredResource = {
  id: string;
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  notes: string;
  status: string;
  phone?: string;
  website?: string;
  organizationId: string;
};

export type StoredResourceChanges = UpdateResourcePayload;

type ResourceMutationResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

type ResourceStoreValue = {
  resources: readonly StoredResource[];
  loading: boolean;
  error: string | null;
  addResource: (
    resource: CreateResourcePayload,
  ) => Promise<{ ok: true; resource: StoredResource } | { ok: false; error: string }>;
  removeResource: (resourceId: string) => Promise<ResourceMutationResult>;
  updateStoredResource: (
    resourceId: string,
    changes: StoredResourceChanges,
  ) => Promise<ResourceMutationResult>;
};

const ResourceStoreContext = createContext<ResourceStoreValue | null>(null);

export const ResourceStoreProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<readonly StoredResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadResources = async () => {
      const result = await getResources();

      if (!active) {
        return;
      }

      if (result.ok) {
        setResources(result.resources);
        setError(null);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    void loadResources();

    return () => {
      active = false;
    };
  }, []);

  const addResource = async (resource: CreateResourcePayload) => {
    const result = await postResource(resource);

    if (!result.ok) {
      return result;
    }

    setResources((current) => [...current, result.resource]);
    return { ok: true as const, resource: result.resource };
  };
  const removeResource = async (resourceId: string): Promise<ResourceMutationResult> => {
    const result = await deleteResource(resourceId);

    if (!result.ok) {
      return result;
    }

    setResources((current) => current.filter(({ id }) => id !== resourceId));
    return { ok: true };
  };
  const updateStoredResource = async (
    resourceId: string,
    changes: StoredResourceChanges,
  ): Promise<ResourceMutationResult> => {
    const result = await patchResource(resourceId, changes);

    if (!result.ok) {
      return result;
    }

    setResources((current) => current.map((resource) =>
      resource.id === resourceId
        ? result.resource
        : resource
    ));
    return { ok: true };
  };
  const value = useMemo(
    () => ({
      resources,
      loading,
      error,
      addResource,
      removeResource,
      updateStoredResource,
    }),
    [resources, loading, error],
  );

  return <ResourceStoreContext.Provider value={value}>{children}</ResourceStoreContext.Provider>;
};

export const useResourceStore = (): ResourceStoreValue => {
  const value = useContext(ResourceStoreContext);

  if (value === null) {
    throw new Error("useResourceStore must be used inside ResourceStoreProvider");
  }

  return value;
};
