FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

# Must be defined or envsubst leaves a literal "${API_UPSTREAM}" in the config,
# nginx reads it as an unknown variable, and the container won't boot.
ENV API_UPSTREAM="api:8000"

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY proxy_headers.conf /etc/nginx/proxy_headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
