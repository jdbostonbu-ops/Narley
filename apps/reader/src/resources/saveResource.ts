type Resource = {
  id: string;
};

export const saveResource = <T extends Resource>(
  savedList: readonly T[],
  resource: T
): readonly T[] => {
  const isAlreadySaved = savedList.some(({ id }) => id === resource.id);

  return isAlreadySaved ? savedList : [...savedList, { ...resource }];
};
