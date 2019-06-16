#Using an alpine version of node
FROM node:8.7.0-alpine

#Create app directory and use it as the working directory
RUN mkdir -p /srv/app/senzAdmin-client
WORKDIR /srv/app/senzAdmin-client

#Copying the package files from localstorage to image
COPY package.json /srv/app/senzAdmin-client
COPY package-lock.json /srv/app/senzAdmin-client

#Installing dependencies
RUN npm install

#Copying all the files from localstorage to image
COPY . /srv/app/senzAdmin-client

CMD ["npm","start"]
