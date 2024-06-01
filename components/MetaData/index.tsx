import Head from "next/head";

import useCurrentUrl from "@/hooks/useCurrentUrl";

interface MetaDataProps {
  title?: string; // 각 페이지에 보여질 제목 추가
}

export default function MetaData({ title = "Tickita" }: MetaDataProps) {
  const currentUrl = useCurrentUrl();

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content="Tickita" />
      <meta name="keyword" content="Tickita, 일정 조율, 일정 관리, 간편함" />
      <meta name="description" content="간편한 일정 조율/관리 서비스 Tickita" />

      {/* Open Graph */}
      <meta property="og:title" content="Tickita" />
      <meta property="og:description" content="간편한 일정 조율/관리 서비스 Tickita" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://tickita.net${currentUrl}`} />
      <meta property="og:image" content="추후 OG 이미지 추가 예정" />
      <meta property="og:image:alt" content="Tickita 로고 이미지" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter */}
      <meta property="twitter:title" content="Tickita" />
      <meta name="twitter:description" content="간편한 일정 조율/관리 서비스 Tickita" />
      <meta name="twitter:card" content="website" />
      <meta property="twitter:site" content={`https://tickita.net${currentUrl}`} />
      <meta name="twitter:image" content="추후 OG 이미지 추가 예정" />
      <meta property="twitter:image:alt" content="Tickita 로고 이미지" />
    </Head>
  );
}
