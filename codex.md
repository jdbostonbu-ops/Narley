Provider Weather Alerts — Work List
1. Refresh-on-focus (the actual stale-alert fix)

Wire: add useFocusEffect to the provider Alerts screen so it re-fetches weather when the tab is opened
Refactor: none
Test: open Alerts → it re-fetches current forecast → the stale 91° alert clears (since Open-Meteo now says 87°). This is what fixes the bug you've been chasing.

2. Expiry filtering

Wire: import the tested isAlertExpired + filterActiveAlerts and apply them to the provider's weather alerts (so expired cards drop). The provider currently marks everything "Active" unconditionally.
Refactor: minimal — the provider already imports weather logic from the reader folder; import these the same way. (No file-moving needed unless you want the shared-folder cleanup, which is optional.)
Test: npm run test:unit (provider — no new logic, just importing tested functions, so count unchanged). Plus verify expired alerts don't show.

3. Device location (remove hardcoded coords / mock data)

Wire: use expo-location to get device coordinates; make fetchForecast coordinate-aware (it currently ignores location and has coords baked into the URL); remove the hardcoded NEW_LONDON constant AND the hardcoded URL coords (two places, per Codex); add the expo-location plugin to provider's app.json
Refactor: fetchForecast must be changed to accept coordinates (currently hardcoded)
Test: add temporary logging (like the reader) → confirm it gets real device coords → remove logging. Confirm alerts reflect real location.

4. Live NWS

Wire: replace fetchNws: async () => [] with a real fetch to api.weather.gov (device coords + User-Agent), feeding the tested nwsAlerts parser — same as the reader's fetchNwsAlerts
Refactor: none new (reuses the reader's tested nwsAlerts parser + the reader's fetchNwsAlerts pattern)
Test: confirm the NWS fetch runs (likely returns empty — no active warnings — which is correct). Can't force a real NWS card without an active warning.

5. Error state (swallowed-error fix)

Wire: surface the ignored failures array from getAlertsForLocation → show an error state instead of silently showing "no alerts" (ALERT-P equivalent of ALERT-R-005)
Refactor: the store currently reads result.alerts but ignores result.failures — wire the failures to an error state
Test: verify a fetch failure shows an error, not a false "no alerts"

Optional (not required to finish the feature):
6. Share weather logic into a package (the refactor we discussed — OPTIONAL)

Refactor: move the weather-processing functions (forecastTemperatureAlert, isAlertExpired, filterActiveAlerts, nwsAlerts, normalizeAlert, etc.) from apps/reader/src/ into packages/shared-ui so both apps import from one place instead of the provider reaching into the reader
Why optional: the feature works without it; this is code-cleanliness. Do it if you want the apps decoupled; skip it to finish faster.
Test: all tests in BOTH apps stay green after the move

Honest notes on the list:

Items 1 & 2 are the real bug fix (refresh + expiry → stale alert clears). Do these first.
Item 3 (device location) removes the mock/hardcoded data per your rule.
Item 4 (NWS) adds the missing source.
Item 5 (error state) is a spec requirement (ALERT-R-005 equivalent).
Item 6 (share into package) is the optional refactor — nice-to-have, not needed to finish.
Most of this is WIRING, not new logic — the tested functions already exist. So minimal-to-no new RED→GREEN (unless the error-state or a mapping needs a test).
