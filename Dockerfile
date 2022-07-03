FROM node:alpine as build

WORKDIR /app

COPY . ./

RUN npm install

CMD ["npm", "run", "c"]


FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY --from=build /app/dist /app/dist

RUN npm install

CMD ["npm", "run", "start:bot"]