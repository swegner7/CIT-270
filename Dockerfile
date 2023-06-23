FROM node:alpine

COPY package.json ./

COPY server.js ./

# installs node modules and package-lock
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]