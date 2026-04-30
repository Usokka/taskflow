# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

EXPOSE 3001

CMD ["node", "src/index.js"]
