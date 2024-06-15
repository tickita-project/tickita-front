import { useEffect, useState } from "react";

import classNames from "classnames/bind";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { useDrag } from "@/hooks/useDarg";
import { useDateStore } from "@/store/useDateStore";

import styles from "./DailyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function DailyCalendar() {
  const { focusDate } = useDateStore();
  const { isDragging, startPos, endPos, handlePointerDown } = useDrag();
  const [draggedBlocks, setDraggedBlocks] = useState<Set<number>>(new Set());

  const isBlockWithinDraggedArea = (block: HTMLElement | null) => {
    if (!block || !startPos || !endPos) return false;

    const blockRect = block.getBoundingClientRect();
    const dragRect = {
      left: Math.min(startPos.x, endPos.x),
      top: Math.min(startPos.y, endPos.y),
      right: Math.max(startPos.x, endPos.x),
      bottom: Math.max(startPos.y, endPos.y),
    };

    return (
      blockRect.left < dragRect.right &&
      blockRect.right > dragRect.left &&
      blockRect.top < dragRect.bottom &&
      blockRect.bottom > dragRect.top
    );
  };

  useEffect(() => {
    const newDraggedBlocks = new Set<number>();

    HOURS.forEach((hour) => {
      const block = document.getElementById(`schedule-block-${hour}`);
      if (block && isBlockWithinDraggedArea(block)) {
        newDraggedBlocks.add(hour);
      }
    });

    setDraggedBlocks(newDraggedBlocks);
  }, [isDragging, startPos, endPos]);

  return (
    <div className={cn("container")}>
      <p className={cn("date")}>
        {focusDate.date()} <span>{DAYS[focusDate.day()]}</span>
      </p>
      <div className={cn("all-day-schedules")}></div>
      <div className={cn("time-scroll-container")}>
        {HOURS.map((hour) => (
          <div className={cn("time-block")} key={hour}>
            <p className={cn("label")}>{hour.toString().padStart(2, "0")}</p>
            <div
              key={hour}
              className={cn("schedule-block", {
                dragged: draggedBlocks.has(hour),
              })}
              onPointerDown={handlePointerDown}
              id={`schedule-block-${hour}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
