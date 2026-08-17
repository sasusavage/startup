# One container: Node builds the site, then FastAPI serves both the static
# files and /api from a single process on port 8000.
#
# Coolify: Build Pack = Dockerfile, one domain, nothing else to configure.

FROM node:20-alpine AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /srv

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/app ./app
# The built site sits next to the app; main.py serves it from here.
COPY --from=frontend /app/dist ./static

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
