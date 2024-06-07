import { useEffect, useRef } from "react";
/**
 * 함수와 딜레이시간, 디바운싱 방식의 옵션을 매개변수로 받아서 디바운싱이 적용된 함수를 반환합니다.
 * @param func 디바운싱을 걸 함수
 * @param delay 딜레이 시간
 * @param isLeading 디바운싱 방식, 기본값 false (true이면 Leading Edge 방식, 이벤트 시작시 바로 함수실행)
 * @returns 디바운싱 적용 함수 반환
 */
export default function useDebounce(
  func: (...args: any[]) => void,
  delay: number,
  isLeading: boolean = false,
) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (isLeading && !timeoutId.current) {
      func();
    }

    timeoutId.current = setTimeout(() => {
      if (!isLeading) {
        func();
      }
      timeoutId.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return debouncedFunction;
}
