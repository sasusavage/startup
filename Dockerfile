FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Vite inlines VITE_* at build time, so the chat id has to be present here.
# It is not a secret — a chat id is useless without the bot token.
ARG VITE_TELEGRAM_CHAT_ID=""
ENV VITE_TELEGRAM_CHAT_ID=$VITE_TELEGRAM_CHAT_ID

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

# Must be defined or envsubst leaves "${TELEGRAM_BOT_TOKEN}" in the config,
# nginx reads it as an unknown variable, and the container won't boot. Empty
# means the form 404s while the rest of the site serves normally.
ENV TELEGRAM_BOT_TOKEN=""

# Goes to templates/, not conf.d/, so the entrypoint runs envsubst over it and
# injects TELEGRAM_BOT_TOKEN from the environment at container start.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
