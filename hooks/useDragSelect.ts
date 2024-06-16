import { useState, useRef, useEffect, RefObject } from "react";

interface UseDragSelectReturn {
  draggedIndex: number[];
}

function useDragSelect(
  containerRef: RefObject<HTMLDivElement>,
  onSelect: (selectedDates: number[]) => void,
  onDragEnd?: () => void,
): UseDragSelectReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        const targetIndex = parseInt((e.target as HTMLElement).dataset.index || "-1", 10);
        if (targetIndex !== -1) {
          setIsDragging(true);
          setStartIndex(targetIndex);
          setEndIndex(targetIndex);
          setDraggedIndex([targetIndex]);
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging && containerRef.current && containerRef.current.contains(e.target as Node)) {
        const targetIndex = parseInt((e.target as HTMLElement).dataset.index || "-1", 10);
        if (targetIndex !== -1) {
          setEndIndex(targetIndex);
          const min = Math.min(startIndex!, targetIndex);
          const max = Math.max(startIndex!, targetIndex);
          const newSelectedDates: number[] = [];
          for (let i = min; i <= max; i++) {
            newSelectedDates.push(i);
          }
          setDraggedIndex(newSelectedDates);
        }
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (startIndex !== null && endIndex !== null) {
          const min = Math.min(startIndex, endIndex);
          const max = Math.max(startIndex, endIndex);
          const newSelectedDates: number[] = [];
          for (let i = min; i <= max; i++) {
            newSelectedDates.push(i);
          }
          onSelect(newSelectedDates);
          if (onDragEnd) {
            onDragEnd();
          }
        }
        setStartIndex(null);
        setEndIndex(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, startIndex, endIndex, containerRef, onSelect, onDragEnd]);

  return { draggedIndex };
}

export default useDragSelect;
