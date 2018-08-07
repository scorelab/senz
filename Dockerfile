FROM ubuntu

MAINTAINER Sumedhe Dissanayake

RUN mkdir /senz && \
	apt-get update && \
	apt-get install -y scala wget mongodb && \
	wget https://dl.bintray.com/sbt/debian/sbt-1.2.1.deb && \
	dpkg -i sbt-1.2.1.deb

COPY . /senz

EXPOSE 2552
WORKDIR /senz

CMD ["service", "mongodb", "start"]
CMD ["sbt", "run"]