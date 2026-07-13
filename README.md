# JGG Esports

JGG Esports 홈페이지를 FastAPI 백엔드와 React 프론트엔드로 분리한 프로젝트입니다.

## 구조

```text
.
├── backend/          # FastAPI API 서버
├── frontend/         # Vite + React 웹앱
├── legacy/           # 이전 단일 HTML 정적 사이트 보존본
└── jgg/              # 기존에 있던 별도 복제본, 현재 구조화 작업에서는 건드리지 않음
```

## 백엔드 실행

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

기본 주소는 `http://localhost:8000`입니다.

주요 엔드포인트:

```text
GET    /health
GET    /api/roster
GET    /api/matches
POST   /api/matches
DELETE /api/matches/{match_id}
GET    /api/posts
POST   /api/posts
PUT    /api/posts/{post_id}
DELETE /api/posts/{post_id}
POST   /api/tryouts
GET    /api/tryouts
```

## 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

기본 주소는 `http://localhost:5173`입니다.

프론트가 호출할 API 주소는 `frontend/.env`에 설정할 수 있습니다.

```text
VITE_API_BASE_URL=http://localhost:8000
```

## 메모

현재 게시글과 트라이아웃 지원서는 FastAPI 서버 메모리에 저장됩니다. 서버를 재시작하면 데이터가 초기화되므로, 실제 운영 전에 SQLite/PostgreSQL 같은 영구 저장소를 붙이면 됩니다.

## 배포

프론트엔드는 GitHub Pages로 배포합니다. `main` 브랜치에 push되면 `.github/workflows/deploy-pages.yml`이 `frontend` 앱을 빌드하고 `frontend/dist`를 Pages artifact로 업로드합니다.

GitHub 저장소의 `Settings > Pages > Build and deployment`에서 Source가 `GitHub Actions`로 되어 있어야 이 workflow 배포를 사용합니다.

FastAPI 백엔드는 GitHub Pages에서 실행되지 않습니다. 운영 API가 필요하면 Render, Fly.io, Railway, AWS 같은 별도 서버에 배포하고 `frontend/.env` 또는 GitHub Actions 환경 변수로 `VITE_API_BASE_URL`을 운영 API 주소로 지정해야 합니다.

GitHub Pages 배포에서 운영 API를 연결하려면 저장소의 `Settings > Secrets and variables > Actions > Variables`에 `VITE_API_BASE_URL`을 추가하면 됩니다.
