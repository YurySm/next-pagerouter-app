FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package*.json .

RUN npm install

COPY . .

#ENV NODE_ENV production

RUN npm run build

RUN npm prune --production


CMD [ "npm", "start" ]

