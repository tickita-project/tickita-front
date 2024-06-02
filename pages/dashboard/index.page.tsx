import GroupList from "./components/GroupList";
import Header from "@/components/Header";
import MetaData from "@/components/MetaData";

export default function Dashboard() {
  return (
    <>
      <MetaData title="대시보드 | 티키타" />
      <Header />
      <GroupList />
    </>
  );
}
