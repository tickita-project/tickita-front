import MetaData from "@/components/MetaData";

export default function Home() {
  return (
    <>
      <MetaData title="간편한 일정 조율/관리 서비스 티키타" />
      {process.env.NEXT_PUBLIC_BASE_API_URL}
    </>
  );
}
