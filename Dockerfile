FROM node:12.18.3
# File Author / Maintainer
LABEL authors="Saurav Chavan <saurav.21810942@viit.ac.in>"
# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install
# Copy app source
COPY . /www
# Set work directory to /www
WORKDIR /www
ENV DB mongodb://host.docker.internal:27017/ws
# set your port
ENV PORT 8080
# expose the port to outside world
EXPOSE 8080
RUN /www/node_modules/.bin/md-seed run
# start command as per package.json
CMD ["npm", "start"]