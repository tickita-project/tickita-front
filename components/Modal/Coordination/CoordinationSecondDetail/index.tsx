import React, { MouseEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./CoordinationSecondModal.module.scss";

const cn = classNames.bind(styles);

interface CoordinationSecondModalProps {
  prevStep: () => void;
  participantTimes: any;
  selectedDates: string[];
  setVoteDateLists: React.Dispatch<React.SetStateAction<VoteDate[]>>;
  endDate?: Date;
  setEndDate: (date: Date) => void;
  endTime?: Date;
  setEndTime: (time: Date) => void;
  submit: () => void;
}

interface VoteDate {
  voteDate: Date;
  voteStartTime: Date;
  voteEndTime: Date;
}

interface Group {
  id: string;
  day: string;
  startIndex: number;
  endIndex: number;
  startHour: string;
  endHour: string;
  hours: string[];
}

const CoordinationSecondModal: React.FC<CoordinationSecondModalProps> = ({
  prevStep,
  participantTimes,
  selectedDates,
  setVoteDateLists,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  submit,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCells, setSelectedCells] = useState<{ [key: string]: boolean }>({});
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [disabledCells, setDisabledCells] = useState<{ [key: string]: boolean }>({});
  const tableRef = useRef<HTMLTableElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const sampleDays = selectedDates;

  const today = new Date();
  today.setDate(today.getDate() + 2);
  const todayDateString = today.toISOString().substr(0, 10);

  useEffect(() => {
    updateDisabledCells();
    updateVoteDateLists();
  }, [groups]);

  const updateVoteDateLists = () => {
    const updatedVoteDateLists = makeVoteDateLists(groups);
    setVoteDateLists(updatedVoteDateLists);
  };

  const updateDisabledCells = () => {
    const newDisabledCells: { [key: string]: boolean } = {};

    // 그룹 정보를 기반으로 추가적으로 비활성화할 셀을 처리하는 로직 추가 가능

    setDisabledCells(newDisabledCells);
  };

  const makeVoteDateLists = (groups: Group) => {
    return groups.map((group) => {
      const [year, month, day] = group.day.split("-").map(Number);
      const { earliestHour, latestHour } = calculateEarliestAndLatestTime(group.hours);

      const voteDate = new Date(year, month - 1, day); // month는 0부터 시작
      const voteStartTime = new Date(year, month - 1, day, earliestHour);
      const voteEndTime = new Date(year, month - 1, day, latestHour);

      return {
        voteDate: voteDate.toISOString().split("T")[0], // 'YYYY-MM-DD' 형식
        voteStartTime: voteStartTime.toISOString().split("T")[1].split(".")[0], // 'HH:MM:SS' 형식
        voteEndTime: voteEndTime.toISOString().split("T")[1].split(".")[0], // 'HH:MM:SS' 형식
      };
    });
  };

  const addOneHour = (hour: string) => {
    const [hourStr] = hour.split(":");
    const hourNum = parseInt(hourStr, 10);
    const nextHour = (hourNum + 1) % 24; // Wraps around 24-hour format
    return `${nextHour}:00`;
  };

  const handleMouseDown = (day: string, index: number, hour: string) => (e: MouseEvent) => {
    const cellKey = `${day}-${index}-${hour}`;
    if (selectedCells[cellKey]) {
      handleRemoveGroupByCellKey(cellKey);
      return;
    }

    if (groups.length >= 3) return;

    setIsDragging(true);
    setSelectedRow(`${day}-${index}`);
    const group: Group = {
      id: `group-${Date.now()}`,
      day,
      startIndex: index,
      endIndex: index,
      startHour: hour,
      endHour: addOneHour(hour),
      hours: [hour],
    };
    setCurrentGroup(group);
    setSelectedCells((prev) => ({
      ...prev,
      [cellKey]: true,
    }));
  };

  const handleMouseOver = (day: string, index: number, hour: string) => (e: MouseEvent) => {
    if (isDragging && selectedRow === `${day}-${index}` && currentGroup) {
      const cellKey = `${day}-${index}-${hour}`;
      if (selectedCells[cellKey] || disabledCells[cellKey]) return;

      setSelectedCells((prev) => ({
        ...prev,
        [cellKey]: true,
      }));
      setCurrentGroup((prev) => {
        if (prev) {
          return {
            ...prev,
            endIndex: index,
            endHour: hour,
            hours: [...new Set([...prev.hours, hour])],
          };
        }
        return null;
      });
    }
  };

  const handleMouseUp = () => {
    if (currentGroup) {
      setGroups((prev) => [...prev, currentGroup]);
      setCurrentGroup(null);
    }
    setIsDragging(false);
    setSelectedRow(null);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleRemoveGroupByCellKey = (cellKey: string) => {
    const groupToRemove = groups.find((group) =>
      group.hours.some((hour) => `${group.day}-${group.startIndex}-${hour}` === cellKey),
    );
    if (groupToRemove) {
      handleRemoveGroup(groupToRemove.id);
    }
  };

  const handleRemoveGroup = (groupId: string) => {
    setGroups((prev) => prev.filter((group) => group.id !== groupId));
    setSelectedCells((prev) => {
      const updated = { ...prev };
      const group = groups.find((group) => group.id === groupId);
      if (group) {
        group.hours.forEach((hour) => {
          const cellKey = `${group.day}-${group.startIndex}-${hour}`;
          delete updated[cellKey];
        });
      }
      return updated;
    });
  };

  const calculateEarliestAndLatestTime = (hours: string[]) => {
    const hourNumbers = hours.map((hour) => parseInt(hour.split(":")[0], 10));
    const earliestHour = Math.min(...hourNumbers);
    const latestHour = Math.max(...hourNumbers) + 1;
    return { earliestHour, latestHour };
  };

  const renderGroupTimeRange = (group: Group) => {
    const { earliestHour, latestHour } = calculateEarliestAndLatestTime(group.hours);
    return `${group.day} ${earliestHour}:00 - ${latestHour}:00`;
  };

  return (
    <div className={cn("container")}>
      <div className={cn("label-container")}>
        <div className={cn("main-label")}>일정조율 설정</div>
        <ul className={cn("order-label")}>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>

      <section className={cn("section-container")}>
        <h2 className={cn("title")}>희망 시간 선택</h2>

        <div className={cn("description")}>
          <p>드래그하여 최대 3개까지 빈 일정을 선택해보세요</p>
          <ul>
            <li className={cn("not-selectable")}>
              <div className={cn("box")} />: 선택 불가
            </li>
            <li className={cn("selectable")}>
              <div className={cn("box")} />: 선택 가능
            </li>
            <li className={cn("selected")}>
              <div className={cn("box")} />: 선택 완료
            </li>
          </ul>
        </div>

        <div className={cn("table-container")}>
          <table
            ref={tableRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={cn("schedule-selector")}
          >
            <thead>
              <tr>
                <th>
                  <Image
                    src="/icons/arrow-left-icon.svg"
                    alt="왼쪽 화살표"
                    width={24}
                    height={24}
                  />
                </th>
                {hours.map((hour) => (
                  <th key={hour}>{hour}</th>
                ))}
                <th>
                  <Image
                    src="/icons/arrow-right-icon.svg"
                    alt="오른쪽 화살표"
                    width={24}
                    height={24}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleDays.map((day) => (
                <React.Fragment key={day}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <tr key={`${day}-${index}`}>
                      {index === 0 && (
                        <td rowSpan={3} className={cn("day-label")}>
                          {day}
                        </td>
                      )}
                      {hours.map((hour) => (
                        <td
                          key={`${day}-${index}-${hour}`}
                          onMouseDown={handleMouseDown(day, index, `${hour}`)}
                          onMouseOver={handleMouseOver(day, index, `${hour}`)}
                          className={cn({
                            selected: selectedCells[`${day}-${index}-${hour}`],
                            disabled: disabledCells[`${day}-${index}-${hour}`],
                          })}
                        ></td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className={cn("selected-time-container")}>
          {groups.map((group) => (
            <div key={group.id} className={cn("time")} onClick={() => handleRemoveGroup(group.id)}>
              {renderGroupTimeRange(group)}
              <Image src="/icons/close-icon.svg" alt="닫기" width={20} height={20} />
            </div>
          ))}
        </div>
      </section>

      <section className={cn("end-time-setting")}>
        <h2 className={cn("title")}>투표 마감 시간 설정</h2>
        <div className={cn("setting-container")}>
          <label className={cn("label")}>마감 날짜:</label>
          <input
            type="date"
            value={endDate}
            min={todayDateString}
            onChange={(e) => setEndDate(e.target.value)}
            className={cn("date-input")}
          />
          <label className={cn("label")}>마감 시간:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={cn("time-input")}
          />
        </div>
        <p className={cn("description")}>
          <span>{endDate}</span>일 <span>{endTime}</span>시 까지만 투표받을게요
        </p>
      </section>

      <div className={cn("button-container")}>
        <button type="button" className={cn("prev-button")} onClick={prevStep}>
          이전
        </button>
        <button type="button" className={cn("next-button")} onClick={submit}>
          투표 진행하기
        </button>
      </div>
    </div>
  );
};

export default CoordinationSecondModal;
