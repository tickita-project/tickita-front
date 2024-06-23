import { useState, useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import classNames from "classnames/bind";

import MetaData from "@/components/MetaData";
import { PAGE_PATH } from "@/constants/pagePath";
import calendarLottie from "@/public/images/calendar.json";
import groupCreateLottie from "@/public/images/group-create.json";
import memberManageLottie from "@/public/images/member-manage.json";

import styles from "./Home.module.scss";

const cn = classNames.bind(styles);

const LottiePlayer = dynamic(() => import("react-lottie-player"), { ssr: false });

const COORDINATION_STEP = [
  {
    step: 1,
    title: "조율할 일정 만들기",
    description: ["시간 고민하지 말고 먼저 어떤 내용을 이야기할 지 작성해보세요"],
    imgUrl: "/images/coordination-step1.webp",
  },
  {
    step: 2,
    title: "참석자 초대하기",
    description: ["같이 이야기해야 할 사람들을 모두 초대해보세요"],
    imgUrl: "/images/coordination-step2.svg",
  },
  {
    step: 3,
    title: "가능한 시간 자동 반영",
    description: [
      "티키타가 모두가 만날 수 있는 시간을 알아서 척척 알려줄거에요",
      "최대 3개까지 희망 시간을 골라보세요",
    ],
    imgUrl: "/images/coordination-step3.svg",
  },
  {
    step: 4,
    title: "희망시간 투표하기",
    description: ["초대한 사람들과 함께 만나고 싶은 시간을 선택하고 투표해보세요"],
    imgUrl: "/images/coordination-step4.svg",
  },
  {
    step: 5,
    title: "일정 조율 완료",
    description: [
      "자동으로 캘린더에 일정을 넣어드려요",
      "쉽고 빠르게 일정 시간을 맞추고 싶을 땐, 티키타",
    ],
    imgUrl: "/images/coordination-step5.svg",
  },
];

export default function Home() {
  const [clickedStep, setClickedStep] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<any>(null);

  const handleWheelEvent: EventListener = (e) => {
    const wheelEvent = e as unknown as WheelEvent;
    setScrollY(window.scrollY);

    if (wheelEvent.deltaY > 0) {
      downWheel();
      return;
    }
    upWheel();
  };

  const upWheel = () => {
    if (timer.current) {
      return;
    }

    timer.current = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: 0,
          top: -window.innerHeight + 80,
          behavior: "smooth",
        });
      }
      timer.current = null;
    }, 200);
  };

  const downWheel = () => {
    if (timer.current) {
      return;
    }

    timer.current = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: 0,
          top: window.innerHeight - 80,
          behavior: "smooth",
        });
      }
      timer.current = null;
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheelEvent);
    document.body.classList.add("scrollbar-hidden");

    return () => {
      window.removeEventListener("wheel", handleWheelEvent);
      document.body.classList.remove("scrollbar-hidden");
    };
  }, [scrollY]);

  return (
    <>
      <MetaData title="간편한 일정 조율/관리 서비스 티키타" />

      <header className={cn("header")}>
        <nav className={cn("nav")}>
          <Image src="/icons/tickita-logo.svg" alt="티키타 로고" width={60} height={22} />
          <Link href={PAGE_PATH.SIGN_IN} className={cn("login-button")}>
            로그인
          </Link>
        </nav>
      </header>

      <div ref={containerRef} className={cn("scroll-container")}>
        <section className={cn("section", "first-section")}>
          <div className={cn("slogan")}>
            <div className={cn("slogan-line")}>
              일정
              <Image
                src="icons/landing-calendar.svg"
                alt="캘린더"
                width={65}
                height={63}
                className={cn("calendar-icon")}
              />
              잡기가 막막하다면
            </div>
            <div className={cn("slogan-line")}>
              지금 바로
              <Image
                src="icons/tickita-fullname-logo.svg"
                alt="티키타 로고"
                width={132}
                height={44}
                className={cn("tickita-logo")}
              />
            </div>
          </div>
          <Link href={PAGE_PATH.SIGN_IN} className={cn("login-button")}>
            가입하기
          </Link>

          <div className={cn("next-arrow-container")}>
            티키타가 궁금하다면?
            <Image
              src="icons/landing-arrow.svg"
              alt="화살표"
              width={60}
              height={8}
              className={cn("next-arrow")}
            />
          </div>
        </section>

        <section className={cn("section", "second-section")}>
          <div className={cn("point-letter")}>
            <Image src="icons/landing-point-icon.svg" alt="포인트" width={80} height={8} />
            <p className={cn("text")}>
              사람이 많을수록 번거로운 일정 잡기
              <br />
              모두가 겪는 문제에 집중했어요
            </p>
          </div>

          <div className={cn("card-container")}>
            <div className={cn("green-card-container")}>
              <div className={cn("card", "green-card")}>
                <h3 className={cn("card-number")}>01</h3>
                <p className={cn("card-text")}>
                  멤버들끼리 진행 사항 공유가 잘 되지 않아서 <span>소통이 잘 안되는 것 같아요</span>
                </p>
              </div>
              <p className={cn("card-bottom-text")}>원활한 소통</p>
            </div>
            <div className={cn("orange-card-container")}>
              <div className={cn("card", "orange-card")}>
                <h3 className={cn("card-number")}>02</h3>
                <p className={cn("card-text")}>
                  모두의 의견을 들어봐야 해서 만남이 필요한데, 사람이 많으니{" "}
                  <span>시간 약속 잡기가 어려워요</span>
                </p>
              </div>
              <p className={cn("card-bottom-text")}>약속 잡기</p>
            </div>
            <div className={cn("pink-card-container")}>
              <div className={cn("card", "pink-card")}>
                <h3 className={cn("card-number")}>03</h3>
                <p className={cn("card-text")}>
                  그룹 활동도 여러 개 하고 있고 개인 일정도 많아서 뭐가{" "}
                  <span>어떤 일정인지 구분하기 어려워요</span>
                </p>
              </div>
              <p className={cn("card-bottom-text")}>일정 관리</p>
            </div>
          </div>
        </section>

        <section className={cn("section", "third-section")}>
          <div className={cn("key-point-container")}>
            <div className={cn("label")}>KEY POINT - 01</div>
            <h2 className={cn("description")}>
              그룹을 만들고 멤버를 초대해보세요
              <br />
              다양한 활동, 모임 별로 소통할 수 있어요
            </h2>
          </div>
          <div className={cn("function-container")}>
            <div className={cn("function")}>
              <div className={cn("text-container")}>
                <h3 className={cn("text-title")}>그룹 가입 및 생성</h3>
                <p className={cn("text-description")}>
                  같이 해야하는 활동이 필요하다면?
                  <br />
                  언제든 내가 속한 다양한 그룹을 만들고 가입할 수 있어요
                </p>
              </div>
              <LottiePlayer animationData={groupCreateLottie} loop play className={cn("video")} />
            </div>
            <div className={cn("function")}>
              <div className={cn("text-container")}>
                <h3 className={cn("text-title")}>멤버 관리</h3>
                <p className={cn("text-description")}>
                  그룹 활동을 같이 하고 싶은 인원을 초대해보세요
                  <br />
                  멤버들 간의 작은 연결고리가 되어드릴게요
                </p>
              </div>
              <LottiePlayer animationData={memberManageLottie} loop play className={cn("video")} />
            </div>
          </div>
        </section>

        <section className={cn("section", "fourth-section")}>
          <div className={cn("key-point-container")}>
            <div className={cn("label")}>KEY POINT - 02</div>
            <h2 className={cn("description")}>
              멤버가 모두 참여해야 되는 일정이라면
              <br />
              클릭 몇 번으로 일정을 잡아보세요
            </h2>
          </div>
          <div className={cn("accordion-container")}>
            {COORDINATION_STEP.map((item) => (
              <div
                key={item.step}
                onClick={() => setClickedStep(item.step)}
                className={cn("accordion", { [styles.active]: clickedStep === item.step })}
              >
                <div className={cn("card-in-accordion")}>
                  <div className={cn("text-container")}>
                    <h3>
                      <span>{item.step}</span>
                      {item.title}
                    </h3>
                    <div>
                      <p>{item.description[0]}</p>
                      {item.description[1] && <p>{item.description[1]}</p>}
                    </div>
                  </div>
                  <Image src={item.imgUrl} alt="일정 조율" width={560} height={400} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={cn("section", "fifth-section")}>
          <div className={cn("key-point-container")}>
            <div className={cn("label")}>KEY POINT - 03</div>
            <h2 className={cn("description")}>
              때로는 그룹 활동을 위한 공유 캘린더로,
              <br />
              때로는 나만을 위한 프라이빗 캘린더로
            </h2>
          </div>
          <LottiePlayer animationData={calendarLottie} loop play className={cn("video")} />
        </section>
      </div>
    </>
  );
}
