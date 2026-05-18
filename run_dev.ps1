# 1. Поднять docker‑сервисы (Postgres, Redis, MinIO)
docker compose up -d

# 2. Бэкенд (FastAPI)
Start-Process powershell -ArgumentList @"
cd "$PSScriptRoot\back_fastapi"
.\venv\Scripts\activate
uvicorn app.main:app --reload
"@

# 3. Телеграм‑бот
Start-Process powershell -ArgumentList @"
cd "$PSScriptRoot\bot_aiogram"
.\venv\Scripts\activate
python bot.py
"@

# 4. Фронтенд (Next.js)
Start-Process powershell -ArgumentList @"
cd "$PSScriptRoot\front_nextjs"
npm run dev
"@