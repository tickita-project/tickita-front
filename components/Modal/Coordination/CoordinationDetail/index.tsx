import { useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import DatePicker from "./components/DateSelect/DatePicker";
import Dropdown from "./components/Dropdown";
import NameCard from "./components/NameCard";

import styles from "./CoordinationModal.module.scss";

const cn = classNames.bind(styles);

interface CoordinationModalProps {
  titleText: string;
  setTitleText: (text: string) => void;
  locationText: string;
  setLocationText: (text: string) => void;
  infoText: string;
  setInfoText: (text: string) => void;
  selectedCrews: number[];
  setSelectedCrews: (crews: (prevState: number[]) => number[]) => void;
  selectedGroupId: number | null;
  setSelectedGroupId: (groupId: number) => void;
  selectedDates: string[];
  setSelectedDates: (dates: string[]) => void;
  groupList: any;
  groupInfo: any;
  closeModal: () => void;
  nextStep: () => void;
  handleGroupChange: (groupId: number) => void;
  handleDateSelect: (dates: string[]) => void;
}

const CoordinationModal: React.FC<CoordinationModalProps> = ({
  titleText,
  setTitleText,
  locationText,
  setLocationText,
  infoText,
  setInfoText,
  selectedCrews,
  setSelectedCrews,
  selectedGroupId,
  groupList,
  groupInfo,
  closeModal,
  nextStep,
  handleGroupChange,
  handleDateSelect,
}) => {
  useEffect(() => {
    if (selectedGroupId !== null) {
    }
  }, [selectedGroupId]);

  const crews =
    groupInfo?.crewMembers.map((member: { accountId: number; nickName: string }) => ({
      key: member.accountId,
      name: member.nickName,
    })) || [];

  const handleSelectionChange = (key: number) => {
    setSelectedCrews((prevState: number[]) => {
      if (prevState.includes(key)) {
        return prevState.filter((item) => item !== key);
      } else {
        return [...prevState, key];
      }
    });
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className={cn("container")}>
      <div className={cn("main-container")}>
        <div className={cn("header")}>
          <div className={cn("info")}>
            <p className={cn("title")}>기본정보 입력</p>
            <div className={cn("icon-container")}>
              <p className={cn("first-icon")}>1</p>
              <p className={cn("second-icon")}>2</p>
            </div>
          </div>
          <input
            type="text"
            className={cn("name")}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="무슨 일정인가요?"
            value={titleText}
          />
        </div>
        <div className={cn("location-container")}>
          <p>장소</p>
          <div className={cn("location")}>
            <Image src="/icons/location-icon.svg" width={20} height={20} alt="장소" />
            <input
              className={cn("location-input")}
              type="text"
              placeholder="(예시) 위워크 을지로점 10층 C미팅룸"
              onChange={(e) => setLocationText(e.target.value)}
              value={locationText}
            />
          </div>
        </div>
        <div className={cn("context-container")}>
          <div className={cn("context")}>
            <p>추가 내용</p>
            <textarea
              className={cn("textarea")}
              maxLength={80}
              onChange={(e) => setInfoText(e.target.value)}
              value={infoText}
            ></textarea>
            <span className={cn("count")}>{infoText.length}/80</span>
          </div>
          <div className={cn("dropdown-context")}>
            <Dropdown groups={groupList || []} onChange={handleGroupChange} />
          </div>
          <div className={cn("context")}>
            <p>참석자</p>
            <div className={cn("participant-list")}>
              {crews.map((crew: { key: number; name: string }) => (
                <NameCard
                  key={crew.key}
                  text={crew.name}
                  isSelected={selectedCrews.includes(crew.key)}
                  onClick={() => handleSelectionChange(crew.key)}
                />
              ))}
            </div>
          </div>
          <div className={cn("context")}>
            <p>
              날짜 선택{"   "}
              <span className={cn("extra-info")}>
                최대 3개까지 진행하고 싶은 일정을 선택해보세요
              </span>
            </p>
            <span className={cn("extra-info-blue")}>30일 이내에서만 선택 가능해요</span>
          </div>
          <DatePicker onSelect={handleDateSelect} />
        </div>
      </div>
      <div className={cn("button-container")}>
        <button type="button" className={cn("cancel-button")} onClick={handleCancel}>
          <p>취소</p>
        </button>
        <button type="submit" className={cn("next-button")} onClick={nextStep}>
          <p>다음으로</p>
        </button>
      </div>
    </div>
  );
};

export default CoordinationModal;
