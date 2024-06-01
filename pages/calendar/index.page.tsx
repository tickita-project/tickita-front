import { useEffect, useState } from "react";

import dayjs from "dayjs";

import DatePicker from "@/components/DatePicker/DatePicker";

export default function CalendarPage() {
  const [focusDate, setFocusDate] = useState<Date>(new Date());
  useEffect(() => {
    console.log(focusDate);
  }, []);
  return <DatePicker selectedDay={focusDate} setSelectedDay={setFocusDate} hasButtons={true} />;
}
