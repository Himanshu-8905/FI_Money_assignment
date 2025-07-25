# --- Base Stage ---
FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# --- Application Stage ---
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
