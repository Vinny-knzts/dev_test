#TODO Configure o Dockerfile

FROM node:lts-alpine

WORKDIR /api

COPY ./ ./

RUN npm i

EXPOSE 3000

CMD npm run dev
