import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./ScheduleCoordination.module.scss";

const cn = classNames.bind(styles);

const hours = Array.from({ length: 24 }, (_, i) => `${i}시`);

const sampleDays = ["06월 27일 (월)", "06월 28일 (화)", "06월 30일 (목)"];

const sampleSelectedTimes = [
  "2024년 06월 27일 13:00 - 14:00",
  "2024년 06월 28일 13:00 - 14:00",
  "2024년 06월 28일 15:00 - 16:00",
];

export default function CreateScheduleCoordination() {
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
          <table className={cn("schedule-selector")}>
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
                <>
                  <tr key={day}>
                    <td rowSpan={3} className={cn("day-label")}>
                      {day}
                    </td>
                    {hours.map((hour) => (
                      <td key={hour} />
                    ))}
                  </tr>
                  <tr key={day}>
                    {hours.map((hour) => (
                      <td key={hour} />
                    ))}
                  </tr>
                  <tr key={day}>
                    {hours.map((hour) => (
                      <td key={hour} />
                    ))}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className={cn("selected-time-container")}>
          {sampleSelectedTimes.map((time) => (
            <div key={time} className={cn("time")}>
              {time}
              <Image src="/icons/close-icon.svg" alt="닫기" width={20} height={20} />
            </div>
          ))}
        </div>
      </section>

      <section className={cn("end-time-setting")}>
        <h2 className={cn("title")}>투표 마감 시간 설정</h2>
        <p className={cn("description")}>
          <span>2024.06.26</span>일 <span>16:00</span>시 까지만 투표받을게요
        </p>
      </section>

      <div className={cn("button-container")}>
        <button type="button" className={cn("prev-button")}>
          이전
        </button>
        <button type="button" className={cn("next-button")}>
          투표 진행하기
        </button>
      </div>
    </div>
  );
}
