#FROM ubuntu
#RUN apt-get update
#RUN apt-get install -y git nodejs npm
#RUN git clone git://github.com/DuoSoftware/DVP-ResourceService.git /usr/local/src/resourceservice
#RUN cd /usr/local/src/resourceservice; npm install
#CMD ["nodejs", "/usr/local/src/resourceservice/app.js"]

#EXPOSE 8831

FROM node:9.9.0
ARG VERSION_TAG
RUN git clone -b $VERSION_TAG https://github.com/DuoSoftware/DVP-CombankProfileService.git
RUN cd /usr/local/src/combankprofileservice
WORKDIR /usr/local/src/combankprofileservice
RUN npm install
EXPOSE 8999
CMD [ "node", "/usr/local/src/combankprofileservice/app.js" ]
