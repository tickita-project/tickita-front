import { RefObject, useEffect } from "react";

type UseOutsideClickProps = {
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent) => void;
};

/**
 * @desc 전달 받은 DOM 과 연관없는 것을 클릭한 경우 인자의 handler 호출
 * @param ref 기준이 되는 DOM
 * @param handler 기준이 되는 되는 DOM 외의 요소를 클릭할 경우 호출할 함수
 * -
 */
export function useOutsideClick({ ref, handler }: UseOutsideClickProps) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
}
