FROM node:18.1.0-alpine
MAINTAINER Jungchan Son
MAINTAINER rnrmfjc@gmail.com

WORKDIR /HelpTodo-front

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "start"]
