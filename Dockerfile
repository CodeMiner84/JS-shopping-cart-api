FROM node:10-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN chmod +x /usr/app/run.sh
ENTRYPOINT ["sh", "/usr/app/run.sh"]
EXPOSE 3010
CMD yarn start