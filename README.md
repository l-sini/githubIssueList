# angular github list

angular github list

## 기본 실행 방법

- **npm run start**를 통해 local, host로 실행 가능
- **npm run build**를 통해 build 파일 생성 가능

## 기본 세팅 환경

- node version **18.17.0**
- npm version **9.6.7**
- react **18.2.0**
- build **vite**
- airbnb 스타일의 eslint 적용

## 사용 library

- 기본 통신 **axios**
- api 사용법 **react-query**
- 날짜관련 **date-fns**
- css **emotion**

### api 정리

- GET /repos/{owner}/{repo}/issues : 리포지토리에 대한 이슈 보기(여러 querystring을 받지만 page, page_per_page, sort만 이용)
- GET /repos/{owner}/{repo}/issues/{issueNumber} : 이슈 정보보기

### 기타사항

- Issue 로드 후 스크롤 하단으로 이동이 이슈리스트 하단으로 이해하여 작업
- Issue 마지막에 ad 추가로 이해하여 작업
- 페이지 없이 로드를 통해 한페이지씩 보이는 작업으로 이해하여 작업 진행했으나 계속 연결하는 화면도 작업 진행(v2)
