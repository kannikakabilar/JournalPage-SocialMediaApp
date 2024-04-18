FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

EXPOSE 4000

CMD ["node", "index.js"]