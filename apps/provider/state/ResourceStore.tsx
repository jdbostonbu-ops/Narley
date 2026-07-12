import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

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
};

type ResourceStoreValue = {
  resources: readonly StoredResource[];
  addResource: (resource: StoredResource) => void;
  removeResource: (resourceId: string) => void;
};

const ResourceStoreContext = createContext<ResourceStoreValue | null>(null);

export const ResourceStoreProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<readonly StoredResource[]>([]);
  const addResource = (resource: StoredResource) => setResources((current) => [...current, resource]);
  const removeResource = (resourceId: string) => {
    setResources((current) => current.filter(({ id }) => id !== resourceId));
  };
  const value = useMemo(
    () => ({ resources, addResource, removeResource }),
    [resources],
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
