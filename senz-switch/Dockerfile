FROM ubuntu:16.04

RUN mkdir /senz

RUN apt-get update && \
	apt-get install -y  --no-install-recommends \
	scala \
	wget \
	mongodb \
	&& apt-get clean \
 	&& rm -rf /var/lib/apt/lists/*

RUN wget https://dl.bintray.com/sbt/debian/sbt-1.2.1.deb \
	&& dpkg -i sbt-1.2.1.deb

COPY . /senz

EXPOSE 2552
WORKDIR /senz

CMD ["service", "mongodb", "start"]
