ALERT-R-009 — Thunderstorm alert (2-day advance, persistent)

Behavior
Reader Alerts generate a single thunderstorm alert when the Open-Meteo daily
forecast shows a thunderstorm on the day two days ahead. The function reads ONLY
the daily forecast entry at index 2 (index 0 = today, index 1 = tomorrow, index 2
= two days ahead). It does not alert on today or tomorrow. A thunderstorm is
identified by the daily weathercode at index 2 being 95 (thunderstorm), 96
(thunderstorm with slight hail), or 99 (thunderstorm with heavy hail). At most one
thunderstorm alert is produced, reported by that day's date.

The alert persists so the card does not fall off: once generated, the thunderstorm
card remains visible until 24 hours after its expected date. It is not removed by
a later refresh that no longer shows a thunderstorm, and a failed or unavailable
forecast fetch does not clear an existing unexpired card. The weather store merges
newly generated alerts with previously displayed, still-unexpired alerts rather
than replacing the list. (Same persistence and expiry behavior as ALERT-R-006.)

This is subject to the same Weather Alerts on/off setting, GPS-based location,
and refresh behavior as ALERT-R-001.

Expected result
When the daily weathercode at index 2 is 95, 96, or 99, the function returns a
thunderstorm alert carrying the index-2 date. When index 2 is not 95, 96, or 99,
no thunderstorm alert is produced, even if index 0 or index 1 shows a
thunderstorm. An empty or too-short forecast (no index 2) produces no alert. Once
generated, the card remains until 24 hours after its expected date and is not
removed by a refresh that no longer shows a thunderstorm or by a failed fetch.

RED Test
The function does not alert when index 2's weathercode is 95, 96, or 99; or it
alerts when index 2 is not a thunderstorm; or it alerts from index 0 or index 1
instead of index 2; or a generated card disappears before 24 hours after its
expected date when a later refresh no longer shows a thunderstorm or the fetch
fails.

GREEN Test
The function flags a thunderstorm only from the index-2 daily entry (codes 95, 96,
or 99), returns that day's date, produces no alert when index 2 does not qualify,
and the card persists until 24 hours past its expected date across refreshes and
failed fetches.

ALERT-R-010 — High wind alert (2-day advance, persistent)

Behavior
Reader Alerts generate a single high-wind alert when the Open-Meteo daily forecast
shows high winds on the day two days ahead. Unlike rain, snow, and thunderstorm
alerts, high wind is NOT determined by a weathercode; it is evaluated from the
numeric daily maximum wind gust field (windgusts_10m_max), requested in mph. The
function reads ONLY the daily forecast entry at index 2 (index 0 = today, index 1
= tomorrow, index 2 = two days ahead). It does not alert on today or tomorrow.
High wind is identified by the index-2 daily maximum wind gust being greater than
or equal to 46 mph (the NWS Wind Advisory gust threshold). At most one high-wind
alert is produced, reported by that day's date.

The alert persists so the card does not fall off: once generated, the high-wind
card remains visible until 24 hours after its expected date. It is not removed by
a later refresh that no longer shows high wind, and a failed or unavailable
forecast fetch does not clear an existing unexpired card. The weather store merges
newly generated alerts with previously displayed, still-unexpired alerts rather
than replacing the list. (Same persistence and expiry behavior as ALERT-R-006.)

This is subject to the same Weather Alerts on/off setting, GPS-based location,
and refresh behavior as ALERT-R-001.

Expected result
When the index-2 daily maximum wind gust is >= 46 mph, the function returns a
high-wind alert carrying the index-2 date. A gust of exactly 46 qualifies
(inclusive). When the index-2 gust is below 46, no high-wind alert is produced,
even if index 0 or index 1 is at or above 46. An empty or too-short forecast (no
index 2) produces no alert. Once generated, the card remains until 24 hours after
its expected date and is not removed by a refresh that no longer shows high wind
or by a failed fetch.

RED Test
The function does not alert when index 2's gust is >= 46; or it alerts when index
2's gust is below 46; or it uses the wrong boundary (e.g. strictly greater-than,
so 46 fails to trigger); or it alerts from index 0 or index 1 instead of index 2;
or a generated card disappears before 24 hours after its expected date when a
later refresh no longer shows high wind or the fetch fails.

GREEN Test
The function flags high wind only from the index-2 daily maximum gust (>= 46 mph,
inclusive), returns that day's date, produces no alert when index 2 is below 46,
and the card persists until 24 hours past its expected date across refreshes and
failed fetches.

ALERT-R-012 — Human-readable alert date

Behavior
Weather alert messages display the alert's expected date in a human-readable
format: weekday, abbreviated month, day, and year — e.g. "Tuesday, Jul 21, 2026".
The date is derived from the alert's ISO date (expectedAt, e.g. "2026-07-21") and
must render the same calendar day as the ISO date, without any timezone-induced
off-by-one shift (an ISO date of 2026-07-21 must never render as Jul 20 or Jul 22).

Expected result
Given an ISO date "2026-07-21", the formatted output is "Tuesday, Jul 21, 2026".
The weekday, month, day, and year all correspond to the ISO calendar date. The
formatting does not shift the day due to UTC/local timezone parsing.

RED Test
The formatter returns the wrong weekday or a shifted day for a given ISO date
(e.g. renders 2026-07-21 as Monday or as Jul 20); or omits the year; or does not
produce the "Weekday, Mon D, YYYY" shape.

GREEN Test
The formatter converts an ISO date (YYYY-MM-DD) into "Weekday, Mon D, YYYY" using
the local calendar date with no timezone day-shift.

ALERT-R-013 — Weather alert messages use the formatted date

Behavior
When normalizeAlert builds a card for a daily weather alert (HEAVY_RAIN,
HEAVY_SNOW, THUNDERSTORM, HIGH_WIND), the message states the condition and the
expected date in human-readable form using formatAlertDate (ALERT-R-012), in the
form "<Condition> expected on <Weekday, Mon D, YYYY>". The raw ISO date is never
shown in the message. Temperature alerts (HEAT, COLD) are unchanged and continue
to use their existing time value.

Expected result
A HEAVY_RAIN alert with expectedAt "2026-07-21" produces the message
"Heavy rain expected on Tuesday, Jul 21, 2026". HEAVY_SNOW, THUNDERSTORM, and
HIGH_WIND follow the same "<Condition> expected on <formatted date>" pattern. No
weather-alert message contains the raw ISO date (e.g. "2026-07-21").

RED Test
A daily weather alert message contains the raw ISO date instead of the formatted
date; or does not use the "expected on <formatted date>" wording; or the
temperature alert behavior changes.

GREEN Test
normalizeAlert renders daily weather alert messages as "<Condition> expected on
<Weekday, Mon D, YYYY>" via formatAlertDate, and leaves temperature alerts
unchanged.