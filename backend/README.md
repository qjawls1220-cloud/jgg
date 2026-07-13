# JGG Backend

FastAPI 기반 API 서버입니다. 현재는 화면 연동을 빠르게 확인할 수 있도록 메모리 저장소를 사용합니다.

## 실행

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 환경 변수

`.env.example`을 참고하세요.

```text
APP_NAME=JGG API
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```
