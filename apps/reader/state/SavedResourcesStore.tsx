import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ReaderResource } from "../src/components/resource-card";
import {
  deleteSavedResource,
  getSavedResources,
  saveResource as persistSavedResource,
  type SavedResourceRecord,
} from "../src/api/client";
import { useReaderAuth } from "../src/auth/useReaderAuth";
import { getSavedResourcesForUser } from "../src/resources/getSavedResourcesForUser";
import { removeSavedResource } from "../src/resources/removeSavedResource";
import { saveResource } from "../src/resources/saveResource";

export type SavedResourceItem = ReaderResource & {
  resourceId: string;
  userId: string;
  savedAt: Date;
};

type SavedResourceActionResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

type SavedResourcesValue = {
  items: readonly SavedResourceItem[];
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
  save: (resource: ReaderResource) => Promise<SavedResourceActionResult>;
  remove: (id: string) => Promise<SavedResourceActionResult>;
};

const toSavedResourceItem = (
  record: SavedResourceRecord,
): SavedResourceItem => ({
  id: record.id,
  resourceId: record.resourceId,
  userId: record.readerId,
  title: record.title,
  category: record.category,
  address: record.address,
  latitude: record.latitude,
  longitude: record.longitude,
  notes: record.notes ?? "",
  status: record.status ?? "Saved",
  savedAt: record.savedAt,
});

const SavedResourcesContext = createContext<SavedResourcesValue | null>(null);

export const SavedResourcesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useReaderAuth();
  const [items, setItems] = useState<readonly SavedResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (): Promise<void> => {
    if (user === null) {
      setItems([]);
      setError("Log in to view saved resources");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const savedResources = await getSavedResources();
      const readerItems = savedResources.map(toSavedResourceItem);
      setItems(getSavedResourcesForUser(readerItems, user.id));
    } catch (loadError: unknown) {
      setItems([]);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load saved resources",
      );
    } finally {
      setLoading(false);
    }
  };

  const save = async (
    resource: ReaderResource,
  ): Promise<SavedResourceActionResult> => {
    if (user === null) {
      return { ok: false, error: "Log in to save resources" };
    }

    if (resource.latitude === undefined || resource.longitude === undefined) {
      return { ok: false, error: "This resource has no valid map location" };
    }

    try {
      const savedResource = await persistSavedResource({
        resourceId: resource.id,
        title: resource.title,
        category: resource.category,
        address: resource.address,
        latitude: resource.latitude,
        longitude: resource.longitude,
        notes: resource.notes,
        status: resource.status,
      });
      const savedItem = toSavedResourceItem(savedResource);
      setItems((current) => saveResource(current, savedItem));
      setError(null);
      return { ok: true };
    } catch (saveError: unknown) {
      const message = saveError instanceof Error
        ? saveError.message
        : "Unable to save resource";
      setError(message);
      return { ok: false, error: message };
    }
  };

  const remove = async (id: string): Promise<SavedResourceActionResult> => {
    try {
      await deleteSavedResource(id);
      setItems((current) => removeSavedResource(current, id));
      setError(null);
      return { ok: true };
    } catch (removeError: unknown) {
      const message = removeError instanceof Error
        ? removeError.message
        : "Unable to delete saved resource";
      setError(message);
      return { ok: false, error: message };
    }
  };

  const value = useMemo(
    () => ({ items, loading, error, load, save, remove }),
    [items, loading, error, user],
  );

  return (
    <SavedResourcesContext.Provider value={value}>
      {children}
    </SavedResourcesContext.Provider>
  );
};

export const useSavedResources = (): SavedResourcesValue => {
  const value = useContext(SavedResourcesContext);

  if (value === null) {
    throw new Error("useSavedResources must be used inside SavedResourcesProvider");
  }

  return value;
};
