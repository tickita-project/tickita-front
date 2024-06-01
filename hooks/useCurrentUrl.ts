import { useRouter } from "next/router";

/*
 * 현재 페이지의 URL을 반환하는 Hook
 * @return {string} - 현재 페이지의 URL
 * @example https://example.com/about?name=john 인 경우 '/about?name=john'을 반환
 */
const useCurrentUrl = (): string => {
  const { asPath } = useRouter();
  return asPath;
};

export default useCurrentUrl;
