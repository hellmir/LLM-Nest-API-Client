# ![ai](https://github.com/user-attachments/assets/4a4fece4-ce22-48f1-a1a1-a5804ab4ebc0) Nest.js 기반 생성형 AI  Streaming API Client 템플릿<br><br>

## 📋 프로젝트 설명
- LLM Streaming Server를 통해 Nest.js 기반 서비스에서 LLM 스트리밍 서비스를 제공하는 API 클라이언트 템플릿
- 기본 템플릿과 예시 제공
  <br><br>

## 📼 서비스 시연
![hyobin-llm](https://github.com/user-attachments/assets/f62ff497-d639-4176-b21a-e29d6cda76bd)
<br><br>

## 📅 프로젝트 기간
<b>2025. 02. 09</b>
<br><br>

## 👫 구성원

### 성효빈
- 서버 개발, 배포 및 관리
  <br>

## 📚 관련 URL
- [서비스 URL](https://hyobin-llm.vercel.app)
- [LLM Streaming 서버 API](https://hyobin-llm.duckdns.org/docs)
- [LLM Spring API 클라이언트 서버 API](https://hyobin-llm-spring.duckdns.org/swagger-ui/index.html)
- [LLM Nest.js API 클라이언트 서버 API](https://hyobin-llm-nest.duckdns.org/api)
- [LLM 클라이언트 Repository](https://github.com/hellmir/LLM-Streaming-Client)
- [LLM Streaming 서버 Repository](https://github.com/hellmir/LLM-Streaming-Server)
- [LLM Spring API 클라이언트 서버 Repository](https://github.com/hellmir/LLM-Spring-API-Client)
  <br><br>

## ![ai](https://github.com/user-attachments/assets/d2cdfacc-c141-400c-9ba4-3f77d7664714) LLM Models
- Mistral Large
- Gemini 1.5 Pro
- Llama 3.3
- HCX-003
- GPT 3.5 Turbo
- Claude Haiku
- DeepSeek V3

## 🗼 Architecture
![llm-service](https://github.com/user-attachments/assets/c63002e7-8260-4cd8-99de-7cbd4ab4d850)

## 🛠️ Skills

## Back-End
- TypeScript
- Nest.js
- RxJS
  <br>

## DevOps

### Build
- TSC

### WAS
- Express

### Server
- AWS EC2
  <br>

## Tools

### IDE
- VS Code
- WebStorm

### Issue Tracking
- Jira
<br>

## 릴리스 정보 - LLM Nest API Client - LlmNestApiClientRelease02/09

### 하위 작업

[LNAC-3](https://langchain.atlassian.net/browse/LNAC-3) package.json 및 tsconfig.json 추가

[LNAC-4](https://langchain.atlassian.net/browse/LNAC-4) platform-express 패키지 설치

[LNAC-5](https://langchain.atlassian.net/browse/LNAC-5) reflect-metadata 패키지 설치

[LNAC-6](https://langchain.atlassian.net/browse/LNAC-6) @nestjs/common 패키지 설치

[LNAC-7](https://langchain.atlassian.net/browse/LNAC-7) @nestjs/core 패키지 설치

[LNAC-8](https://langchain.atlassian.net/browse/LNAC-8) @nestjs/config 패키지 설치

[LNAC-9](https://langchain.atlassian.net/browse/LNAC-9) @nestjs/axios 패키지 설치

[LNAC-10](https://langchain.atlassian.net/browse/LNAC-10) @types/node 패키지 설치

[LNAC-11](https://langchain.atlassian.net/browse/LNAC-11) typescript 패키지 설치

[LNAC-12](https://langchain.atlassian.net/browse/LNAC-12) ts-node 패키지 설치

[LNAC-13](https://langchain.atlassian.net/browse/LNAC-13) tsconfig-paths  패키지 설치

[LNAC-14](https://langchain.atlassian.net/browse/LNAC-14) @types/express 패키지 설치

[LNAC-15](https://langchain.atlassian.net/browse/LNAC-15) class-validator 패키지 설치

[LNAC-16](https://langchain.atlassian.net/browse/LNAC-16) class-transformer 패키지 설치

[LNAC-18](https://langchain.atlassian.net/browse/LNAC-18) 기존에 구현한 LLM Streaming 서버로 Prompt 요청을 전송해 응답을 제공받는 클라이언트 컴포넌트 추가

[LNAC-19](https://langchain.atlassian.net/browse/LNAC-19) 특정 Prompt에 대한 Steraming 응답을 제공받을 수 있는 템플릿 엔드포인트 추가

[LNAC-20](https://langchain.atlassian.net/browse/LNAC-20) 특정 Prompt에 대한 SSE 방식의 Steraming 응답을 제공받을 수 있는 템플릿 엔드포인트 추가

[LNAC-21](https://langchain.atlassian.net/browse/LNAC-21) 레시피 추천 요청 Prompt에 대한 Steraming 응답을 제공받을 수 있는 예시 엔드포인트 추가

[LNAC-22](https://langchain.atlassian.net/browse/LNAC-22) 레시피 추천 요청 Prompt에 대한 SSE 방식의 Steraming 응답을 제공받을 수 있는 레시피 추천 예시 엔드포인트 추가

[LNAC-24](https://langchain.atlassian.net/browse/LNAC-24) @nestjs/swagger 패키지 설치

[LNAC-25](https://langchain.atlassian.net/browse/LNAC-25) swagger-ui-express 패키지 설치

[LNAC-26](https://langchain.atlassian.net/browse/LNAC-26) main.ts에 Swagger 설정 추가

[LNAC-28](https://langchain.atlassian.net/browse/LNAC-28) 파라미터 샘플값 적용

[LNAC-29](https://langchain.atlassian.net/browse/LNAC-29) 엔드포인트 설명

[LNAC-30](https://langchain.atlassian.net/browse/LNAC-30) 서버 API 설명

[LNAC-32](https://langchain.atlassian.net/browse/LNAC-32) SSL/TLS 인증서 발급

[LNAC-33](https://langchain.atlassian.net/browse/LNAC-33) Nest.js 애플리케이션 실행 시 인증서 적용

[LNAC-37](https://langchain.atlassian.net/browse/LNAC-37) 기본 템플릿의 엔드포인트 삭제

[LNAC-38](https://langchain.atlassian.net/browse/LNAC-38) 예시 템플릿의 엔드포인트 삭제

[LNAC-39](https://langchain.atlassian.net/browse/LNAC-39) 중복되는 응답 생성 및 전송 로직 분리

### 스토리

[LNAC-17](https://langchain.atlassian.net/browse/LNAC-17) 클라이언트는 서버로부터 개발 서비스 도메인에 대한 LLM 스트리밍 서비스를 제공받을 수 있다

[LNAC-27](https://langchain.atlassian.net/browse/LNAC-27)  클라이언트는 Swagger 문서를 통해 LLM 서버 이용 가이드를 확인할 수 있다

[LNAC-31](https://langchain.atlassian.net/browse/LNAC-31) 클라이언트는 LLM 서버를 신뢰하고 요청을 암호화해 전송할 수 있다

### 에픽

[LNAC-1](https://langchain.atlassian.net/browse/LNAC-1) LLM API 클라이언트 Nest.js 서버 템플릿 구현

### 작업

[LNAC-2](https://langchain.atlassian.net/browse/LNAC-2) 프로젝트 환경 설정

[LNAC-23](https://langchain.atlassian.net/browse/LNAC-23) 서버 API 문서화를 위한 Swagger 추가

[LNAC-36](https://langchain.atlassian.net/browse/LNAC-36) SSE 엔드포인트 삭제

[LNAC-40](https://langchain.atlassian.net/browse/LNAC-40) README.md 추가
