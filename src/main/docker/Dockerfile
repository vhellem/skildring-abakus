
# The smallest Docker image with OracleJDK 8 (167MB)
# See: https://hub.docker.com/r/frolvlad/alpine-oraclejdk8/
FROM frolvlad/alpine-oraclejdk8:slim
# The maintainer allows you to set the Author field of generated images. In addition, one may 
# want to institute de-facto or formal image propagation responsibilities in an enterprise. For
# example if your private registies are poluted with released (Maven parlance) images that will
# never be used then this very author may be responsible for house keeping (deletion from registries). 
MAINTAINER Nico de Wet <nico@nicodewet.com>
# We added a VOLUME pointing to "/tmp" because that is where a Spring Boot application creates
# working directories for Tomcat by default. The effect is to create a temporary 
# file on your host under "/var/lib/docker" and link it to the container under "/tmp". This 
# step is optional for the simple app that we wrote here, but can be necessary for other Spring # Boot applications if they need to actually write in the filesystem.
VOLUME /tmp
# Add the specified source file to the file system of the container at the specified path
ADD spring-boot-docker-template-0.0.1-SNAPSHOT.jar app.jar
# You can use a RUN command to "touch" the jar file so that it has a file modification time (Docker creates all container files in an "unmodified" state by default). 
# This actually isn’t important for the simple app that we wrote, but any static content (e.g. "index.html") would require the file to have a modification time.
RUN sh -c 'touch /app.jar'
# To reduce Tomcat startup time we added a system property pointing to "/dev/urandom" as a source of entropy.
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
