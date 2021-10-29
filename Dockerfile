FROM node:14

WORKDIR '/usr/app'

# Installing dependencies
COPY ./package.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY ./ ./

# Exposed port
EXPOSE 3003

# Default command
CMD [ "npm", "start" ]