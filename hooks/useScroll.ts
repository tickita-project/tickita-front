import { useEffect, useRef, RefObject } from "react";

/**
 * 특정 요소에 ref를 걸고 그 요소위에서 스크롤을 위로 올리거나 내려서 이벤트를 발생시킵니다.

 * @param handleScrollUp 스크롤 위로 올릴때 발생될 함수
 * @param handleScrollDown 스크롤 아래로 내릴때 발생될 함수
 * @param isUsable 훅을 사용할지 안할지 결정 ( 기본 true 이므로 신경안써도 무방)
 * @returns HTML 요소에 걸 ref
 */
export default function useScroll<T extends HTMLElement>(
  handleScrollDown: () => void,
  handleScrollUp: () => void,
  isUsable = true,
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!isUsable || !element) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        handleScrollUp();
      } else if (event.deltaY > 0) {
        handleScrollDown();
      }
    };

    element.addEventListener("wheel", handleWheel);

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [handleScrollDown, handleScrollUp, isUsable]);

  return ref;
}
