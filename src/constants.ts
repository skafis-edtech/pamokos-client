export const defaultGroupId = "F8G4Xk6uQaB5REJDJ0l7";

export const defaultStartTime = (() => {
  const now = new Date();
  const result = new Date(now);
  result.setUTCHours(17, 10, 0, 0);
  const day = result.getUTCDay();
  const distanceToWednesday = (3 + 7 - day) % 7;
  result.setUTCDate(result.getUTCDate() + distanceToWednesday);
  if (result < now) {
    result.setUTCDate(result.getUTCDate() + 7);
  }
  return result;
})();

export const defaultEndTime = new Date(
  defaultStartTime.getTime() + 60 * 60 * 1000
);

export const timeZoneOffset = new Date().getTimezoneOffset() / -60;
export const timeZoneString =
  "GMT" + (timeZoneOffset > 0 ? "+" : "") + timeZoneOffset;
export const applyTimeZoneOffset = (date: Date) =>
  new Date(date.getTime() + timeZoneOffset * 60 * 60 * 1000);
