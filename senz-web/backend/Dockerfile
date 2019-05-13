#Using an alpine version of node
FROM node:8.7.0-alpine

#Create app directory and use it as the working directory
RUN mkdir -p /srv/app/senzAdmin-server
WORKDIR /srv/app/senzAdmin-server

#Copying the package files from localstorage to image
COPY package.json /srv/app/senzAdmin-server
COPY package-lock.json /srv/app/senzAdmin-server

#Installing dependencies
RUN npm install

#Copying all the files from localstorage to image
COPY . /srv/app/senzAdmin-server

#Starting the server using nodemon
CMD ["npm","run","dev"]



