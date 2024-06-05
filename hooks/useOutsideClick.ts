import { RefObject, useEffect } from "react";

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent) => void;
}

/**
 * 전달 받은 요소 밖의 것을 클릭한 경우 인자의 handler 호출
 * @param ref 기준이 되는 DOM
 * @param handler 호출할 함수
 */
export function useOutsideClick({ ref, handler }: UseOutsideClickProps) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  });
}
