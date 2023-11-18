FROM node:18.1.0-alpine
MAINTAINER Jungchan Son
MAINTAINER rnrmfjc@gmail.com

WORKDIR /HelpTodo-front

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
