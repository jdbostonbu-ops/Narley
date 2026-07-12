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
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const initialResources: StoredResource[] = [
  {
    id: "sample-food-resource",
    title: "Test Food Resource",
    address: "181 State Street, New London, CT 06320",
    latitude: 41.3557,
    longitude: -72.0995,
    category: "Food",
    notes: "Community food support available during posted provider hours.",
    status: "Active",
    expiresAt: new Date(Date.now() + 30 * DAY_IN_MS),
  },
  {
    id: "sample-soup-kitchen",
    title: "Test Soup Kitchen",
    address: "106 Truman Street, New London, CT 06320",
    latitude: 41.3632,
    longitude: -72.1058,
    category: "Meals",
    notes: "Prepared meals and local support information.",
    status: "Active",
    expiresAt: new Date(Date.now() + 30 * DAY_IN_MS),
  },
  {
    id: "sample-community-pantry",
    title: "Test Community Pantry",
    address: "1 Beach Pond Road, Groton, CT 06340",
    latitude: 41.3489,
    longitude: -72.0917,
    category: "Food",
    notes: "Pantry resources for nearby households.",
    status: "Active",
    expiresAt: new Date(Date.now() + 30 * DAY_IN_MS),
  },
];

const ResourceStoreContext = createContext<ResourceStoreValue | null>(null);

export const ResourceStoreProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<readonly StoredResource[]>(initialResources);
  const addResource = (resource: StoredResource) => setResources((current) => [...current, resource]);
  const value = useMemo(() => ({ resources, addResource }), [resources]);

  return <ResourceStoreContext.Provider value={value}>{children}</ResourceStoreContext.Provider>;
};

export const useResourceStore = (): ResourceStoreValue => {
  const value = useContext(ResourceStoreContext);

  if (value === null) {
    throw new Error("useResourceStore must be used inside ResourceStoreProvider");
  }

  return value;
};
