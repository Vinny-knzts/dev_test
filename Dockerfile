#TODO Configure o Dockerfile

FROM node:21-alpine

WORKDIR /api

COPY ./ ./

RUN npm install \
  && npm run build

EXPOSE 3000

CMD npm start
