FROM node:lts-alpine

# Create app directory
RUN mkdir -p /src
WORKDIR /src

# Install app dependencies
COPY package.json /src
RUN npm install

# Bundle app source
COPY . /src

EXPOSE 3000
CMD [ "npm", "start" ]