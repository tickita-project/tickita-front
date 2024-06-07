import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface DateStoreType {
  focusDate: Dayjs;
  viewDate: Dayjs;

  setFocusDate: (day: Dayjs) => void;
  setViewDate: (day: Dayjs) => void;
}

export const useDateStore = create<DateStoreType>((set) => ({
  focusDate: dayjs(),
  viewDate: dayjs(),
  setFocusDate: (day: Dayjs) => set(() => ({ focusDate: day })),
  setViewDate: (day: Dayjs) => set(() => ({ viewDate: day })),
}));
