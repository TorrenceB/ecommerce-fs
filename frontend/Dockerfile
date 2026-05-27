FROM node:current-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173

ENV WATCHPACK_POLLING=true

CMD ["npm", "run", "dev"]