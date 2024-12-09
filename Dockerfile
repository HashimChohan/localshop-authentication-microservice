FROM node:16.17.1
WORKDIR /app
RUN npm i -g @nestjs/cli
COPY package.json /app
RUN npm install --force
ENV NODE_ENV dev
COPY ./packages/mongodb-crud-operations /app/node_modules/mongodb-crud-operations
COPY ./ /app
RUN nest build
EXPOSE 2333
CMD ["node","dist/main"]