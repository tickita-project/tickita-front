import { useState, useEffect, useCallback, PointerEvent as ReactPointerEvent } from "react";

interface Position {
  x: number;
  y: number;
}

export function useDrag() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [endPos, setEndPos] = useState<Position | null>(null);

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    // pointer capture 시작
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging) {
        setEndPos({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        console.log("드래그 시작 위치:", startPos);
        console.log("드래그 끝 위치:", endPos);
        // pointer capture 해제
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        // 여기서 드래그된 영역의 정보를 처리
      }
    },
    [isDragging, startPos, endPos],
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    } else {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return {
    isDragging,
    startPos,
    endPos,
    handlePointerDown,
  };
}
