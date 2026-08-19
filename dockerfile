FROM node:20-alpine AS builder
WORKDIR /app

# Зависимости отдельным слоем: он переиспользуется, пока не менялся
# package-lock, и не пересобирается на каждую правку кода.
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# Docker сам выставляет HOSTNAME в идентификатор контейнера, а server.js
# из standalone-сборки берёт адрес привязки именно оттуда. Без этой строки
# сервер слушает только адрес eth0: снаружи через проброс порта всё
# работает, а изнутри 127.0.0.1 отвечает "connection refused", из-за чего
# healthcheck считал живой контейнер мёртвым.
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# standalone кладётся в корень, поэтому server.js ищет статику и public
# рядом с собой.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static/
COPY --from=builder --chown=nextjs:nodejs /app/public ./public/

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
