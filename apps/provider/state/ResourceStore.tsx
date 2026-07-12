import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getResources,
  postResource,
  type CreateResourcePayload,
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

export type StoredResourceChanges = Partial<Omit<StoredResource, "id">>;

type ResourceStoreValue = {
  resources: readonly StoredResource[];
  loading: boolean;
  error: string | null;
  addResource: (
    resource: CreateResourcePayload,
  ) => Promise<{ ok: true; resource: StoredResource } | { ok: false; error: string }>;
  removeResource: (resourceId: string) => void;
  updateStoredResource: (
    resourceId: string,
    changes: StoredResourceChanges,
  ) => void;
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
  const removeResource = (resourceId: string) => {
    setResources((current) => current.filter(({ id }) => id !== resourceId));
  };
  const updateStoredResource = (
    resourceId: string,
    changes: StoredResourceChanges,
  ) => {
    setResources((current) => current.map((resource) =>
      resource.id === resourceId
        ? { ...resource, ...changes, id: resource.id }
        : resource
    ));
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
