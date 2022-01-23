FROM node:16.11.0-alpine

WORKDIR /app

COPY package.json .
COPY dist .

RUN ["npm", "--production", "--silent"]

EXPOSE 8080
CMD ["npm", "run", "start"]
