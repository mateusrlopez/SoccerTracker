FROM node:18.15.0 AS builder

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

FROM node:18.15.0-alpine

COPY --from=builder dist dist
COPY --from=builder prisma prisma
COPY --from=builder package.json .

RUN ["npm", "install", "--omit=dev", "--ignore-scripts"]

RUN ["npx", "prisma", "generate"]

CMD [ "npm", "run", "start:prod" ]
