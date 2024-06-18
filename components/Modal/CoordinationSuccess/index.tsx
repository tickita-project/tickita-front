import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { PAGE_PATH } from "@/constants/pagePath";

import styles from "./CoordinationSuccess.module.scss";

const cn = classNames.bind(styles);

export default function CoordinationSuccessModal() {
  const router = useRouter();

  return (
    //빈 div 하나는 gif 자리입니다.
    <div className={cn("container")}>
      <div className={cn("modal-header")}>
        <div></div>
        <div className={cn("modal-title")}>
          <div className={cn("modal-title-main")}>투표 요청이 완료되었어요</div>
          <div className={cn("modal-title-sub")}>
            요청한 투표 현황은 <span className={cn("sub-span")}>마이페이지 - 일정 조율 현황</span>
            에서 확인하실 수 있어요
          </div>
        </div>
      </div>
      <div className={cn("modal-body")}>
        <div className={cn("modal-body-title")}>투표 마감 후 진행 안내</div>
        <div className={cn("modal-body-main")}>
          <div className={cn("modal-body-content")}>
            <Image src="/images/heart-box.png" width={92} height={92} alt="하트 표시 상자" />
            <div>
              <div className={cn("modal-body-content-text")}>
                하나의 일정이 <b>과반수 이상</b> 받은 경우
              </div>
              <div className={cn("modal-body-content-text-sub")}>
                자동적으로 과반수 이상 받은 날짜로 캘린더에 등록되요
              </div>
            </div>
          </div>
          <div className={cn("modal-body-content")}>
            <Image src="/images/cross-box.png" width={92} height={92} alt="엑스 표시 상자" />
            <div>
              <div className={cn("modal-body-content-text")}>
                두 개 이상 일정이 <b>같은 득표</b>를 받은 경우
              </div>
              <div className={cn("modal-body-content-text-sub")}>
                두 개의 일정 중 더 빨리 만날 수 있는 시간으로 일정을 반영할거에요
              </div>
            </div>
          </div>
        </div>
        <div className={cn("modal-body-sub")}>
          <div className={cn("modal-body-sub-text")}>
            모두가 투표에 참여하지 않은 경우에는 조율 요청 자체가 없어져요
          </div>
          <div className={cn("modal-body-sub-text")}>
            투표에 참여하지 않은 인원은 자동으로 참석자에서 빠지게 되어 있어요
          </div>
        </div>
      </div>
      <div className={cn("modal-footer")}>
        <button
          className={cn("modal-button")}
          onClick={() => {
            router.push(PAGE_PATH.MY_PAGE);
          }}
        >
          네. 확인했어요
        </button>
      </div>
    </div>
  );
}
