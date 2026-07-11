type ResourceInput = {
  title?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
};

type ResourceValidationResult = {
  valid: boolean;
  errors: string[];
};

export const validateResource = (
  resource: ResourceInput,
): ResourceValidationResult => {
  const errors: string[] = [];

  if (resource.title === undefined || resource.title.trim().length === 0) {
    errors.push("Resource title is required.");
  }

  if (
    resource.category === undefined ||
    resource.category.trim().length === 0
  ) {
    errors.push("Resource category is required.");
  }

  if (resource.latitude === undefined || resource.longitude === undefined) {
    errors.push("Resource location requires latitude and longitude.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
