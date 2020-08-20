FROM node:14.8.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . /app
EXPOSE 8080
CMD ["npm","run","dev"]