import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import DatePicker from "@/components/DatePicker/DatePicker";

export default function CalendarPage() {
  const [focusDate, setFocusDate] = useState<Dayjs>(dayjs());

  return <DatePicker selectedDay={focusDate} setSelectedDay={setFocusDate} hasButtons={true} />;
}
