import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { shadows } from "./shadows";

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  pill: 999
};

export type Theme = {
  colors: typeof colors.normal;
  spacing: typeof spacing;
  typography: typeof typography;
  shadows: typeof shadows;
  radius: typeof radius;
};

export const getTheme = (emergencyMode: boolean): Theme => {
  return {
    colors: emergencyMode ? colors.emergency : colors.normal,
    spacing,
    typography,
    shadows,
    radius
  };
};

export const theme: Theme = getTheme(false);
