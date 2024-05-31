import { useState } from "react";

import DatePicker from "@/components/DatePicker/DatePicker";

export default function CalendarPage() {
  const [focusDate, setFocusDate] = useState(new Date());
  return <DatePicker selectedDay={focusDate} setSelectedDay={setFocusDate} hasButtons={true} />;
}
