type TemperatureAlert =
  | { alert: true; type: "HEAT" | "COLD" }
  | { alert: false };

export const temperatureAlert = (fahrenheit: number): TemperatureAlert => {
  if (fahrenheit >= 91) {
    return { alert: true, type: "HEAT" };
  }

  if (fahrenheit <= 32) {
    return { alert: true, type: "COLD" };
  }

  return { alert: false };
};
