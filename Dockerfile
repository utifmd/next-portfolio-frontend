FROM node:latest

WORKDIR development/frontend/nextjs/portfolio-frontend

COPY package*.json .

RUN npm install

CMD ["npm", "run", "dev"]

COPY . .

EXPOSE 3000