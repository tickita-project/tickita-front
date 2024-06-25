import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import Header from "@/components/Header";
import TitleBox from "@/components/TitleBox";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import styles from "./Vote.module.scss";
import { useGetVote } from "@/hooks/useGetVote";
import { number } from "zod";
import { postSelectVote } from "@/apis/apis";

const cn = classNames.bind(styles);

interface VotePageProps {}

interface SelectedVotesState {
  [key: string]: boolean;
}

interface VoteCountsState {
  [key: string]: number;
}

export default function VotePage({}) {
  //아이디 가져오기 1
  //주최자와 아이디가 일치하는지 확인
  //일치하면 경고문이랑 버튼 바꾸기
  //일치하지 않으면 그대로 두기
  //투표를 했지는 안 했는지 확인하고 여부에 따라 투표 활성화

  //const { data: meetingData } = useGetVote();
  const router = useRouter();
  const voteSubjectId = Number(router.query.voteSubjectId);
  const crewId = Number(router.query.crewId);

  const { data: userInfo } = useGetUserInfo();
  const { data: meetingData } = useGetVote(crewId, voteSubjectId);
  const [allVoteCount, setAllVoteCount] = useState(meetingData.voteDateListResponses.length);
  const [selectedVotes, setSelectedVotes] = useState<number[]>([]);
  const [remainTimeText, setRemainTimeText] = useState("");
  const [voteCounts, setVoteCounts] = useState<VoteCountsState>(
    meetingData.voteDateListResponses.reduce((acc, { voteStateId, count }) => {
      const key = voteStateId;
      acc[key] = count;
      return acc;
    }, {}),
  );
  console.log(selectedVotes);
  const [year, month, day] = meetingData.endDate.split("-");
  const endTime = meetingData.endTime.slice(0, 5);
  const isCreator = userInfo?.accountId !== meetingData.creatorId; //제출전에 풀자
  const hasVoted = meetingData.voteListResponses.some(
    (vote) => vote.accountId === userInfo?.accountId && vote.voteParticipateType,
  );
  const alaramImageUrl = !isCreator ? "/images/red-bell.svg" : "/images/stop-hand.svg";
  const alaramText = isCreator ? (
    <>
      잠깐! 혹시 일정 조율을 만드셨나요? <br />
      주최자라면 별도로 투표할 필요 없어요
    </>
  ) : (
    <>
      투표에 참여하지 않으면 <br />
      자동으로 일정에서 제외되니 <br />
      주의해주세요
    </>
  );
  const buttonText = isCreator ? "투표 완료" : hasVoted ? "투표 완료" : "투표 제출하기";

  const handleRemainTime = (remainTime) => {
    if (remainTime > 86400) {
      setRemainTimeText(`${Math.floor(remainTime / 86400)}일`);
      return;
    }
    setRemainTimeText(`${Math.floor(remainTime / 3600)}시간`);
  };

  const handleCheckboxChange = (voteStateId: number) => {
    if (hasVoted || isCreator) {
      return;
    }

    setSelectedVotes((prevSelectedVotes) => {
      const isSelected = prevSelectedVotes.includes(voteStateId);
      if (isSelected) {
        return prevSelectedVotes.filter((id) => id !== voteStateId);
      } else {
        return [...prevSelectedVotes, voteStateId];
      }
    });

    setVoteCounts((prevVoteCounts) => ({
      ...prevVoteCounts,
      [voteStateId]: prevVoteCounts[voteStateId] + (selectedVotes.includes(voteStateId) ? -1 : 1),
    }));

    setAllVoteCount(
      (prevAllVoteCount) => prevAllVoteCount + (selectedVotes.includes(voteStateId) ? -1 : 1),
    );
  };

  const handleVoteSubmit = () => {
    //투표 보내기
    const voteData = {
      crewId: userInfo?.accountId,
      voteStateIds: selectedVotes,
    };
    const data = postSelectVote(voteData, voteSubjectId);
  };

  useEffect(() => {
    handleRemainTime(meetingData.remainTime);
    console.log(userInfo?.accountId);
    console.log(isCreator);
    console.log(hasVoted);
  }, []);

  return (
    <div className={cn("warp")}>
      <Header />
      <div className={cn("container")}>
        <div className={cn("container-left")}>
          <div>
            <TitleBox title="상세 정보" />
            <div className={cn("detail-container")}>
              <p className={cn("detail-title")}>{meetingData.title}</p>
              <div className={cn("detail-content")}>
                <div className={cn("detail-content-requester-container")}>
                  <div className={cn("detail-content-header2")}>일정 요청자</div>
                  <div>
                    <div>그룹이름</div>
                    {meetingData.crewName}
                  </div>
                </div>
                <div className={cn("detail-content-location-container")}>
                  <div className={cn("detail-content-header")}>장소</div>
                  <div className={cn("detail-content-location")}>
                    <Image src="/icons/location-icon.svg" width={20} height={20} alt="장소 표시" />
                    {meetingData.place}
                  </div>
                </div>
                <div className={cn("detail-content-text-container")}>
                  <div className={cn("detail-content-header")}>추가 내용</div>
                  <div className={cn("detail-content-text")}>{meetingData.content}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn("alaram-container")}>
            <div className={cn("alaram-content")}>
              <Image src={alaramImageUrl} width={80} height={80} alt="알림 아이콘" />
              <b>{alaramText}</b>
            </div>
          </div>
        </div>
        <div className={cn("container-right")}>
          <div>
            <TitleBox title="참석 인원" />
            <div className={cn("member-list-container")}>
              <div className={cn("member-list")}>
                {meetingData.voteListResponses.map(
                  ({ accountId, nickName, voteParticipateType }) => (
                    <div className={cn("member-card")} key={accountId}>
                      <p>{nickName}</p>
                      {!voteParticipateType ? (
                        <p className={cn("voted")}>투표 완료</p>
                      ) : (
                        <p className={cn("no-voted")}>투표 전</p>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className={cn("vote-dashboard")}>
            <div className={cn("time-button-container")}>
              <div className={cn("time-container")}>
                <div className={cn("time-text-container")}>
                  <p className={cn("time-title")}>
                    가능한 일정을
                    <br /> 모두 투표해주세요
                  </p>
                  <div className={cn("time-body")}>
                    <span className={cn("time")}>{remainTimeText} </span>남음
                    <p className={cn("time-footer")}>
                      {month}월 {day}일 {endTime}까지 투표 가능해요
                    </p>
                  </div>
                </div>
                <Image
                  src={`/images/doodoo-charcater.png`}
                  className={cn("dodo-image")}
                  width={120}
                  height={120}
                  alt="두두 케릭터"
                />
              </div>
              {!isCreator ? (
                <button className={cn("submit-button")} onClick={handleVoteSubmit}>
                  <Image src="/icons/vote-icon.svg" width={14} height={14} alt="투표 버튼 아이콘" />
                  <p className={cn("submit-button-text")}>{buttonText}</p>
                </button>
              ) : (
                <button className={cn("delete-button")} disabled={hasVoted}>
                  <Image src="/icons/vote-icon.svg" width={14} height={14} alt="투표 버튼 아이콘" />
                  <p className={cn("submit-button-text")}>{buttonText}</p>
                </button>
              )}
            </div>
            <div className={cn("vote-selection-list")}>
              {meetingData.voteDateListResponses.map(
                ({ voteStateId, voteDate, voteStartTime, voteEndTime }) => {
                  const [year, month, day] = voteDate.split("-");
                  const startTime = voteStartTime.slice(0, 5); // "17:00"
                  const endTime = voteEndTime.slice(0, 5); // "17:00"
                  const isSelected = selectedVotes.includes(voteStateId);
                  const oneVeoteCount = voteCounts[voteStateId];

                  return (
                    <div
                      className={cn("vote-card")}
                      key={voteDate + voteStartTime + voteEndTime}
                      onClick={() => handleCheckboxChange(voteStateId)}
                    >
                      <div className={cn("vote-content")}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={hasVoted || isCreator}
                        />
                        <span>{`${year}년 ${parseInt(month)}월 ${parseInt(day)}일 ${startTime} - ${endTime}`}</span>
                      </div>
                      <div className={cn("vote-bar")}>
                        <div className={cn("vote-bar-container")}>
                          <div
                            className={cn("vote-bar-fill")}
                            style={{ width: `${(oneVeoteCount / allVoteCount) * 100}%` }}
                          />
                        </div>
                        <span className="vote-count">{`${oneVeoteCount}표`}</span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
