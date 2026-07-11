type NwsFeature = {
  properties: {
    event: string;
    headline?: string;
    expires?: string;
    severity?: string;
  };
};

type NwsAlert = {
  event: string;
  headline: string;
  expires: string;
  severity: string;
};

const WARNING_EVENTS = new Set([
  "Tornado Warning",
  "Hurricane Warning",
  "Flood Warning",
  "Flash Flood Warning",
  "Winter Storm Warning",
  "Blizzard Warning",
  "Severe Thunderstorm Warning",
]);

export const nwsAlerts = (features: readonly NwsFeature[]): NwsAlert[] =>
  features
    .filter(({ properties }) => WARNING_EVENTS.has(properties.event))
    .map(({ properties }) => ({
      event: properties.event,
      headline: properties.headline ?? properties.event,
      expires: properties.expires ?? "",
      severity: properties.severity ?? "",
    }));
