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
  //setTimeout or null ref
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = () => {
    //setTimeout이 들어있는 상태이면 클리어하고 리셋
    // 사용자가 딜레이중에 함수를 또 실행시켰다는걸 의미
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    //isLeading 방식이면 여기서 함수실행시킴
    if (isLeading && !timeoutId.current) {
      func();
    }

    //함수 실행시키고 나서 setTimeout 넣어줌
    //딜레이 뒤에 아래함수 수행
    timeoutId.current = setTimeout(() => {
      //trailing 방식이면 여기서 실행
      if (!isLeading) {
        func();
      }
      //실행끝나면 null 넣어줌 (리셋)
      timeoutId.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return debouncedFunction;
}
