type ResourceInput = {
  title?: string;
  category?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  expiresAt?: Date;
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

  if (resource.address === undefined || resource.address.trim().length === 0) {
    errors.push("Resource address is required.");
  }

  if (resource.latitude === undefined || resource.longitude === undefined) {
    errors.push("Resource location requires latitude and longitude.");
  }

  if (
    resource.latitude !== undefined &&
    (!Number.isFinite(resource.latitude) ||
      resource.latitude < -90 ||
      resource.latitude > 90)
  ) {
    errors.push("Latitude must be a finite number between -90 and 90.");
  }

  if (
    resource.longitude !== undefined &&
    (!Number.isFinite(resource.longitude) ||
      resource.longitude < -180 ||
      resource.longitude > 180)
  ) {
    errors.push("Longitude must be a finite number between -180 and 180.");
  }

  if (resource.expiresAt === undefined) {
    errors.push("Resource expiration date is required.");
  } else if (Number.isNaN(resource.expiresAt.getTime())) {
    errors.push("Resource expiration date must be valid.");
  } else {
    const now = Date.now();
    const oneYearFromNow = new Date(now);
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (resource.expiresAt.getTime() < now) {
      errors.push("Resource expiration date cannot be in the past.");
    } else if (resource.expiresAt.getTime() > oneYearFromNow.getTime()) {
      errors.push("Resource expiration date cannot be more than one year away.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
