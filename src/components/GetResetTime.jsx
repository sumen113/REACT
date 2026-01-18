export const RESET_HOUR = 24;
export const RESET_MINUTE = 0;

export function getTodayResetUTC(hour = RESET_HOUR, minute = RESET_MINUTE) {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Adelaide",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  let year = Number(parts.find((p) => p.type === "year").value);
  let month = Number(parts.find((p) => p.type === "month").value);
  let day = Number(parts.find((p) => p.type === "day").value);

  let resetUTC = Date.UTC(year, month - 1, day, hour, minute, 0);

  if (now.getTime() < resetUTC) {
    const d = new Date(resetUTC);
    d.setUTCDate(d.getUTCDate() - 1);
    resetUTC = d.getTime();
  }

  return resetUTC;
}
