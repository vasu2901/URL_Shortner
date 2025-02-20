FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
ENV GOOGLE_CLIENT_ID=
ENV GOOGLE_CLIENT_SECRET=
ENV NEXTAUTH_URL='http://localhost:3000/'

ENV NEXTAUTH_SECRET='alterofiice'

# Recommended for most uses
ENV DATABASE_URL=
ENV KV_URL=
ENV KV_REST_API_READ_ONLY_TOKEN=
ENV KV_REST_API_TOKEN=
ENV KV_REST_API_URL=

EXPOSE 3000

CMD ["npm", "run", "dev"]
