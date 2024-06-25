import { useState, useEffect } from "react";

import { postVote } from "@/apis/apis";
import { useGetDisableTime } from "@/hooks/useGetDisableTime";
import { useGetGroupInfo } from "@/hooks/useGetGroupInfo";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useModalStore } from "@/store/useModalStore";

import CoordinationModal from "../CoordinationDetail";
import CoordinationSecondModal from "../CoordinationSecondDetail";

interface VoteDate {
  voteDate: Date;
  voteStartTime: Date;
  voteEndTime: Date;
}

export default function CoordinationContainer() {
  const { data: groupList } = useGetGroupList();
  const [step, setStep] = useState(1);
  const [titleText, setTitleText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [infoText, setInfoText] = useState("");
  const [selectedCrews, setSelectedCrews] = useState<number[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [voteDateLists, setVoteDateLists] = useState<VoteDate[]>([]);
  const [endDate, setEndDate] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const { data: groupInfo } = useGetGroupInfo(selectedGroupId as number);
  const { closeModal } = useModalStore();

  const handleGroupChange = (groupId: number) => {
    setSelectedGroupId(groupId);
  };

  const handleDateSelect = (dates: string[]) => {
    setSelectedDates(dates);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCoordinationSubmit = async () => {
    const formData = {
      crewId: selectedGroupId,
      title: titleText,
      content: infoText,
      place: locationText,
      voteDateLists: voteDateLists,
      endDate: endDate, // 예시로 첫 번째 날짜 사용
      endTime: endTime, // 예시로 고정된 값 사용
      accountIds: selectedCrews,
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    postVote(formData);
    console.log(formData);
  };

  const { data } = useGetDisableTime(selectedCrews, selectedDates);

  return (
    <>
      {step === 1 && (
        <CoordinationModal
          titleText={titleText}
          setTitleText={setTitleText}
          locationText={locationText}
          setLocationText={setLocationText}
          infoText={infoText}
          setInfoText={setInfoText}
          selectedCrews={selectedCrews}
          setSelectedCrews={setSelectedCrews}
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          groupList={groupList}
          groupInfo={groupInfo}
          closeModal={closeModal}
          nextStep={nextStep}
          handleDateSelect={handleDateSelect}
          handleGroupChange={handleGroupChange}
        />
      )}
      {step === 2 && (
        <CoordinationSecondModal
          selectedDates={selectedDates}
          participantTimes={data}
          setVoteDateLists={setVoteDateLists}
          prevStep={prevStep}
          endDate={endDate}
          setEndDate={setEndDate}
          endTime={endTime}
          setEndTime={setEndTime}
          submit={handleCoordinationSubmit}
        />
      )}
      <div>
        {step}
        {titleText}
        {locationText}
        {infoText}
        {selectedCrews}
      </div>
    </>
  );
}
