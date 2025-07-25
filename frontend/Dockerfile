# --- Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

# Build the project for production
RUN npm run build

# --- Production Stage ---
FROM nginx:stable-alpine

COPY --from=builder /frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
