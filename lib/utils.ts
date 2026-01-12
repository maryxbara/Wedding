import dayjs from "dayjs";

export const WEDDING_DAY = dayjs("2026-04-26T00:00:00");

export function getCountdownParts(target = WEDDING_DAY) {
  const now = dayjs();
  const totalSeconds = Math.max(0, target.diff(now, "second"));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}


