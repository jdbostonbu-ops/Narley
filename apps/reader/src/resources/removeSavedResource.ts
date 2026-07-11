type SavedResource = {
  id: string;
};

export const removeSavedResource = <T extends SavedResource>(
  savedList: readonly T[],
  id: string
): readonly T[] => {
  const isSaved = savedList.some((savedResource) => savedResource.id === id);

  return isSaved
    ? savedList.filter((savedResource) => savedResource.id !== id)
    : savedList;
};
