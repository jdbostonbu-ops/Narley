type ResourceInput = {
  title?: string;
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

  return {
    valid: errors.length === 0,
    errors,
  };
};
