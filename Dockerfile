FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# packages 
COPY package.json ./
COPY yarn.lock ./

RUN npm install 

COPY . . 

EXPOSE 4000

CMD [ "node", "server.js"]
