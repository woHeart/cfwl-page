FROM docker.1ms.run/library/node:20-alpine

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "./bin/www"]