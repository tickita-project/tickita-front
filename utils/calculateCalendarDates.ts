import dayjs, { Dayjs } from "dayjs";

/**
 * 월간 캘린더에 들어갈 날짜를 42일 기준으로 계산
 */
export const calculateMonthDates = (date: Dayjs) => {
  const startOfMonth = date.startOf("month");
  const endOfMonth = date.endOf("month");

  const startDay = startOfMonth.day();
  const endDay = endOfMonth.date();

  const days: Dayjs[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push(startOfMonth.subtract(i + 1, "day"));
  }

  for (let i = 1; i <= endDay; i++) {
    days.push(startOfMonth.date(i));
  }

  const nextMonthStartDate = endOfMonth.add(1, "day");
  while (days.length < 42) {
    days.push(nextMonthStartDate.add(days.length - endDay, "day"));
  }

  return days;
};

export const getCalendarMatrix = (date: Dayjs) => {
  const days = calculateMonthDates(date);
  const weeks: Dayjs[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};

export const divideWeek = (calendarTags: JSX.Element[]) => {
  return calendarTags.reduce((acc: JSX.Element[][], day: JSX.Element, i: number) => {
    if (i % 7 === 0) {
      acc.push([day]);
    } else {
      acc[acc.length - 1].push(day);
    }
    return acc;
  }, []);
};

type DateTimeType = string | Dayjs;

export const convertDayjsIso = (DateTime: DateTimeType): DateTimeType => {
  if (typeof DateTime === "string") {
    return dayjs(DateTime);
  } else {
    return DateTime.toISOString();
  }
};
