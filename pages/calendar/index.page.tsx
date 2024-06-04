import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import DatePicker from "@/components/DatePicker/DatePicker";
import Header from "@/components/Header";

export default function CalendarPage() {
  const [focusDate, setFocusDate] = useState<Dayjs>(dayjs());

  return (
    <>
      <Header />
      <DatePicker selectedDay={focusDate} setSelectedDay={setFocusDate} hasNavigation={true} />;
    </>
  );
}
