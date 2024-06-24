![title](https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/4-19_2992_1719195407123.png)

# 🗓️ 티키타(Tickita)

> **기획 및 개발 기간 : 2024.05.18 ~ 2024.06.25**

## 🔎 서비스 소개

```
- 🤦🏻‍♂️ 많은 사람들과 일정을 잡야야 할 때 조율하기가 너무 어려워요.

- 💼 다양한 그룹에서 활동을 해 일정을 구분 짓기 힘들어요.

- 🤷‍♂️ 팀원들끼리 진행 사항 공유 및 소통이 원활하게 되지 않아요.

위와 같은 문제를 경험 해보셨나요??

💡 저희 티키타 서비스는 이러한 문제들을 해결하고자 서비스를 개발하게 되었어요.
```

## [🚀 배포 URL](https://tickita.net)

**개발 모드로 실행하기**

```bash
git clone https://github.com/tickita-project/tickita-front.git

npm install

npm run dev
```

---

## ⚙️ TechStack

<div align="left">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5a29e4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/TanStack Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">

<br/>
<br/>

## 🍃 Communication

<img src="https://img.shields.io/badge/Discord-5865f2?style=for-the-badge&logo=discord&logoColor=black">
<img src="https://img.shields.io/badge/Figma-f24e1e?style=for-the-badge&logo=figma&logoColor=black">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

<br>

## 👏 팀원 구성

|                                                                                    FE                                                                                    |                                                                                                FE                                                                                                |                                                                                           FE                                                                                           |                                                                                          FE                                                                                          |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/wo-o29"><img src="https://avatars.githubusercontent.com/u/154664697?v=4,wo-o29,우혁,https://github.com/wo-o29" width="140" height="140"></a> | <a href="https://github.com/jae6269"><img src="https://avatars.githubusercontent.com/u/79738890?v=4,jae6269,Jaeyoung Kim,https://github.com/jae6269" alt="profile" width="140" height="140"></a> | <a href="https://github.com/NJ97S"><img src="https://avatars.githubusercontent.com/u/79499733?v=4,NJ97S,Namju So,https://github.com/NJ97S" alt="profile" width="140" height="140"></a> | <a href="https://github.com/tead7"><img src="https://avatars.githubusercontent.com/u/94046941?v=4,tead7,이진호,https://github.com/tead7" alt="profile" width="140" height="140"></a> |
|                                                                   [이우혁](https://github.com/wo-o29)                                                                    |                                                                               [김재영](https://github.com/jae6269)                                                                               |                                                                           [소남주](https://github.com/NJ97S)                                                                           |                                                                          [이진호](https://github.com/tead7)                                                                          |

|                                                                                       BE                                                                                        |                                                                                          BE                                                                                          |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/zy23n"><img src="https://avatars.githubusercontent.com/u/170168132?v=4,zy23n,,https://github.com/zy23n" alt="profile" width="140" height="140"></a> | <a href="https://github.com/lby9906"><img src="https://avatars.githubusercontent.com/u/84373979?v=4,lby9906,,https://github.com/lby9906" alt="profile" width="140" height="140"></a> |
|                                                                       [서지윤](https://github.com/zy23n)                                                                        |                                                                         [김민지](https://github.com/lby9906)                                                                         |

## 📝 팀 컨벤션

**프론트엔드 팀은 컨벤션을 세세하게 정해 코드의 일관성을 높이고 코드 리뷰 시간도 단축할 수 있게 노력하였어요!**

<details>
    <summary> <strong>코드 컨벤션</strong> </summary>
  <br/>
  
  **변수**
  - 기본적으로  camelCase 사용 / 상수는 대문자 SNAKE_CASE 사용
  - boolean 타입의 경우, 앞에 `is`, `has`, `should` 중 하나 붙이기
  - 축약형 사용하지 않기 → `button` O / `btn` X
  
  **함수**
  - 기본적으로 camelCase 사용 / 컴포넌트의 경우 PascalCase 사용
  - 일반 함수는 화살표 함수 사용, 컴포넌트는 function 사용
  - 함수 이름은 명령문 형태로 작성
  - 이벤트를 다룰 경우에는 `handle` + `요소` + `event` 형태로 작성 (ex. `handleCloseButtonClick`)
  - `export default` 함수 앞에 작성
  
  **파일**
  - 컴포넌트는 PascalCase 사용 / 일반 파일은 camelCase 사용
  - 컴포넌트 폴더 안에 `index.tsx` O / `button.tsx` X → Import 중복 제거
  - 스타일 파일명도 PascalCase 사용
  - 이미지 하이픈 사용 / `tickita-logo.svg`
  
  **폴더**
  - 컴포넌트 폴더는 PascalCase 사용
  - 나머지 폴더는 소문자 사용, 길어질 경우 camelCase 사용

**코드**

- if문 한 줄이여도 중괄호 작성

  ```js
  if (true) {
    return true;
  }

  return false;
  ```

**CSS**

- rem 사용 → 16px
- PC버전 부터 작성
- SCSS + CSS Module
- 반응형 컨벤션 → 클래스네임 마다 사용하기

  ```css
  .box {
    margin: 1rem;

    @include mobile {
      margin: 0;
    }
  }
  ```

**타입스크립트**

- interface + type
- 타입 별칭
  - 타입: `UserType`,
  - 컴포넌트: `HeaderProps`

</details>
<br>

<details>
    <summary> <strong>Git 컨벤션</strong> </summary>
  <br/>

**브랜치 전략** <br>
<img src="https://github.com/19-Takify/19-taskify/assets/55544307/fc049688-aa80-44c2-a8d2-03da86a05e9e" width="600px">

```
- main: 프로덕션 배포 브랜치
- develop: 개발 브랜치
- feature/기능명: 기능 개발 브랜치
```

**커밋 메세지**

```bash
- init: 초기 설정
- feat: 새로운 기능 추가
- fix: 버그 수정
- style: css 수정
- refactor: 코드 리팩토링
- chore: 패키지 매니저 수정, 그 외 기타 수정 ex) .gitnore 등
- comment: 필요한 주석 추가 및 변경
- rename: 파일명 수정 및 파일 이동
- remove: 파일 삭제
```

**Pull Request**

- PR 단위: 기능 단위(1이슈 1PR)
- Merge 룰: 최소 2명에게 승인 받아야 Merge 가능(하지만 팀원 모두가 PR 확인하는 것을 권장)
- 리뷰: 코어 타임 시작 후 본인이 리뷰 못한 PR이 있다면 리뷰 먼저 진행 후 개발 진행
</details>
  <br/>

<details>
    <summary> <strong>폴더 구조</strong> </summary>
  <br/>

**Colocation 방식: 관련된 파일들을 기능이나 컴포넌트 단위로 그룹화하여 구성**

```bash
📦tickita
┣ 📂.github
┃ ┣ 📂ISSUE_TEMPLATE
┃ ┣ 📂workflows
┣ 📂apis
┣ 📂components
┃ ┣ 📂ColorCheckBox
┃ ┣ 📂DatePicker
┃ ┃ ┣ 📂MonthNavButton
┃ ┣ 📂ErrorFallBack
┃ ┣ 📂GroupColorPicker
┃ ┣ 📂Header
┃ ┣ 📂Input
┃ ┣ 📂Layout
┃ ┣ 📂Loading
┃ ┣ 📂MetaData
┃ ┣ 📂Modal
┃ ┃ ┣ 📂CancelInvite
┃ ┃ ┣ 📂ChangeLeader
┃ ┃ ┣ 📂Confirm
┃ ┃ ┣ 📂CreateGroup
┃ ┃ ┣ 📂DeleteGroup
┃ ┃ ┣ 📂ExitGroup
┃ ┃ ┣ 📂ExportMember
┃ ┃ ┣ 📂Portal
┃ ┃ ┗ 📂Schedule
┃ ┃ ┃ ┣ 📂ScheduleCreate
┃ ┃ ┃ ┣ 📂ScheduleDetail
┃ ┃ ┃ ┗ 📂ScheduleEdit
┃ ┣ 📂Notification
┃ ┃ ┣ 📂BaseNotification
┃ ┃ ┣ 📂CoordinationNotification
┃ ┃ ┣ 📂EmptyNotification
┃ ┃ ┗ 📂ScheduleInfoNotification
┃ ┣ 📂NotificationPopup
┃ ┣ 📂ProfileImage
┃ ┗ 📂TitleBox
┣ 📂constants
┣ 📂hooks
┣ 📂pages
┃ ┣ 📂api
┃ ┣ 📂calendar
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📂Calendar
┃ ┃ ┃ ┃ ┣ 📂CalendarHeader
┃ ┃ ┃ ┃ ┣ 📂DailyCalendar
┃ ┃ ┃ ┃ ┣ 📂MonthlyCalendar
┃ ┃ ┃ ┃ ┗ 📂WeeklyCalendar
┃ ┃ ┃ ┣ 📂CalendarGroupList
┃ ┃ ┃ ┣ 📂CalendarSideBar
┃ ┃ ┃ ┗ 📂CalendarTypeSegmentedButton
┃ ┣ 📂dashboard
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📂GroupList
┃ ┃ ┃ ┣ 📂NotificationCenter
┃ ┃ ┃ ┗ 📂UpcomingScheduleList
┃ ┃ ┃ ┃ ┣ 📂UpcomingSchedule
┃ ┣ 📂group
┃ ┃ ┗ 📂[id]
┃ ┃ ┃ ┣ 📂components
┃ ┃ ┃ ┃ ┣ 📂ActionButton
┃ ┃ ┃ ┃ ┣ 📂GroupForm
┃ ┃ ┃ ┃ ┣ 📂InviteForm
┃ ┃ ┃ ┃ ┗ 📂MemberList
┃ ┃ ┃ ┃ ┃ ┣ 📂MemberInfo
┃ ┣ 📂my-page
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📂ProfileEditForm
┃ ┃ ┃ ┗ 📂VoteNotification
┃ ┣ 📂sign-in
┃ ┃ ┣ 📂kakao
┃ ┃ ┣ 📂profile-setup
┃ ┃ ┃ ┣ 📂components
┃ ┃ ┃ ┃ ┗ 📂ProfileSetupForm
┣ 📂public
┃ ┣ 📂icons
┃ ┣ 📂images
┣ 📂store
┣ 📂styles
┣ 📂types
┣ 📂utils

```

</details>

**그 외 기술 스택 선정, Github Actions 등 다양한 프로젝트 초기 설정의 내용을 보고 싶다면 아래 링크를 참고해 주세요.**

**<a href="https://brick-william-6f5.notion.site/FE-Convention-dd234c493a0e41c5a652e097313db1f1">👉 FE Convention 보러가기</a>**

<br>

## 💻 프로젝트 내용(페이지 소개)

### 로그인 페이지

**카카오 로그인, 구글 로그인을 지원하고 있습니다.**
![title](https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/4-19_2992_1719207251120.png)
