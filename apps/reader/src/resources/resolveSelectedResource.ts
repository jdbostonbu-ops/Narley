type IdentifiableResource = {
  id: string;
};

export const resolveSelectedResource = <Resource extends IdentifiableResource>(
  resources: readonly Resource[],
  selectedId: string | null,
): Resource | null => {
  if (selectedId === null) {
    return null;
  }

  return resources.find((resource) => resource.id === selectedId) ?? null;
};
