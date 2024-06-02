import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import ColorCheckBox from "@/components/ColorCheckBox";
import DatePicker from "@/components/DatePicker/DatePicker";
import Header from "@/components/Header";

export default function CalendarPage() {
  const [focusDate, setFocusDate] = useState<Dayjs>(dayjs());

  return (
    <>
      <Header />
      <aside>
        <DatePicker selectedDay={focusDate} setSelectedDay={setFocusDate} hasNavigation={true} />
        <ColorCheckBox color="#FF7940" title="코드잇" />
      </aside>
    </>
  );
}
