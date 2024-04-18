FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY ../package.json ../yarn.lock ./

# Install dependencies using yarn
RUN yarn install

RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

WORKDIR /app/client

RUN yarn install

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]