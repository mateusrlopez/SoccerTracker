FROM node:alpine

WORKDIR /

COPY ["./package.json", "./yarn.lock", "./"]
COPY ./dist dist/
COPY ./templates templates/

RUN yarn install --production --no-progress --ignore-scripts

EXPOSE 5000
CMD [ "yarn", "start" ]
