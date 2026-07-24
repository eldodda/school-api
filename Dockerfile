FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD 