FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm install -g @nestjs/cli

EXPOSE 3030

CMD ["npm", "run", "start:dev"]
