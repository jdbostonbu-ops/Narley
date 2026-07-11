type SavedRecord = {
  userId: string;
};

export const getSavedResourcesForUser = <T extends SavedRecord>(
  allSaved: readonly T[],
  userId: string
): T[] => allSaved.filter((savedRecord) => savedRecord.userId === userId);
