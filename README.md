# 비즈니스 모델 마스터 클래스 (BMC Masterclass)

AI를 활용한 비즈니스 모델 캔버스 학습 및 설계 웹 서비스

## 주요 기능

- **4단계 학습 과정**: 기초 개념 → BMC 9블록 → 성공 패턴 → AI 실습
- **AI BMC 생성**: Gemini AI를 활용한 비즈니스 모델 캔버스 자동 생성
- **프로젝트 관리**: 생성한 BMC 저장 및 관리
- **이미지 내보내기**: BMC를 PNG 이미지로 저장

## 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI**: Google Gemini API
- **Hosting**: Lovable

## 프로젝트 구조

```
bmc-masterclass/
├── src/
│   ├── components/
│   │   ├── auth/          # 인증 관련 컴포넌트
│   │   ├── bmc/           # BMC 캔버스 컴포넌트
│   │   ├── layout/        # 레이아웃 컴포넌트
│   │   └── ui/            # UI 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── lib/               # 유틸리티 및 설정
│   ├── pages/             # 페이지 컴포넌트
│   ├── data/              # 정적 데이터
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/         # Edge Functions
│   └── schema.sql         # 데이터베이스 스키마
└── public/
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일 생성:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행
3. Edge Function 배포:
   ```bash
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase secrets set GEMINI_API_KEY=your_gemini_api_key
   supabase functions deploy generate-bmc
   ```

### 4. 개발 서버 실행

```bash
npm run dev
```

## Lovable 배포

1. Lovable에서 GitHub 레포지토리 연결
2. 환경 변수 설정:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. 자동 빌드 및 배포

## 라이선스

MIT License
