FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV GOOGLE_CLIENT_ID='1067387621272-67kpar7bt9r2k4c3bmpu99hqqo49m1u1.apps.googleusercontent.com'
ENV GOOGLE_CLIENT_SECRET='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'
ENV NEXTAUTH_URL='http://localhost:3000/'
ENV NEXTAUTH_SECRET='alterofiice'

ENV DATABASE_URL='postgres://neondb_owner:npg_F9d3BzfYjAGC@ep-noisy-dust-a5twex8c-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'

ENV KV_URL="rediss://default:AULsAAIjcDFkMjc2YjhmZDMxNDU0Yjc1OTllYjJjMWFjMzliMmQ1YnAxMA@casual-viper-17132.upstash.io:6379"
ENV KV_REST_API_READ_ONLY_TOKEN="AkLsAAIgcDGDE9g1WHAmQVwbZw7FK2A28TinQg6H8e31ClWUqJXV4w"
ENV KV_REST_API_TOKEN="AULsAAIjcDFkMjc2YjhmZDMxNDU0Yjc1OTllYjJjMWFjMzliMmQ1YnAxMA"
ENV KV_REST_API_URL="https://casual-viper-17132.upstash.io"

EXPOSE 3000

CMD ["npm", "run", "dev"]
