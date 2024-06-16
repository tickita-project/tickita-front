import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface DateStoreType {
  focusDate: Dayjs;
  viewDate: Dayjs;
  scheduleStart: null | Dayjs;
  scheduleEnd: null | Dayjs;
  setFocusDate: (day: Dayjs) => void;
  setViewDate: (day: Dayjs) => void;
  setScheduleStart: (day: null | Dayjs) => void;
  setScheduleEnd: (day: null | Dayjs) => void;
}

export const useDateStore = create<DateStoreType>((set) => ({
  focusDate: dayjs(),
  viewDate: dayjs(),
  scheduleStart: null,
  scheduleEnd: null,
  setFocusDate: (day) => set(() => ({ focusDate: day })),
  setViewDate: (day) => set(() => ({ viewDate: day })),
  setScheduleStart: (day) =>
    set(() => ({
      scheduleStart: day ? day.month(day.month() + 1) : null,
    })),
  setScheduleEnd: (day) =>
    set(() => ({
      scheduleEnd: day ? day.month(day.month() + 1) : null,
    })),
}));
