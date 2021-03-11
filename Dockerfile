FROM node

WORKDIR /

COPY dist .
COPY package.json .
COPY yarn.lock .

RUN yarn install --production --no-progress --ignore-scripts

EXPOSE 5000
CMD [ "yarn", "start" ]
