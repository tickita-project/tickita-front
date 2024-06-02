import classNames from "classnames/bind";

import GroupList from "./components/GroupList";
import NotificationCenter from "./components/NotificationCenter";
import UpcomingScheduleList from "./components/UpcomingScheduleList";
import Header from "@/components/Header";
import MetaData from "@/components/MetaData";

import styles from "./Dashboard.module.scss";

const cn = classNames.bind(styles);

export default function Dashboard() {
  return (
    <>
      <MetaData title="대시보드 | 티키타" />
      <Header />
      <main className={cn("container")}>
        <div className={cn("wrap")}>
          <GroupList />
          <section className={cn("content")}>
            <div className={cn("calender")}>미니 달력</div>
            <div className={cn("box")}>
              <UpcomingScheduleList />
              <NotificationCenter />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
