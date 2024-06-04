import { ReactNode } from "react";

import classNames from "classnames/bind";

import Header from "@/components/Header";
import GroupList from "@/pages/dashboard/components/GroupList";

import styles from "./Layout.module.scss";

const cn = classNames.bind(styles);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={cn("container")}>
        <div className={cn("wrap")}>
          <GroupList />
          {children}
        </div>
      </main>
    </>
  );
}
