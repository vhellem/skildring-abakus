# template-spring-boot-docker
Template Spring Boot Docker Project

## Key Aspects 

The idea behind this template is for you to be able to clone it and quickly start using it in your enterprise with the following way of working:

* Use [spring-boot-starter-parent](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-starters/spring-boot-starter-parent/pom.xml) as your parent POM.
* Docker tags will must use the familiar and well understood [Maven versioning scheme](https://docs.oracle.com/middleware/1212/core/MAVEN/maven_version.htm#MAVEN8855). 
* Build the docker image using com.spotify's [docker-maven-plugin](https://github.com/spotify/docker-maven-plugin).

The use of com.spotify's plugin delivers on a key requirement, which is the ability to bind the build, tag & push goals to the Maven phases. You can configure the cited plugin so that the container will be built, tagged and pushed when you run just mvn deploy.

## Build and Run

    $ mvn package docker:build
    
    $ docker images
    REPOSITORY                              TAG                 IMAGE ID            CREATED              SIZE
    nicodewet/spring-boot-docker-template   0.0.1-SNAPSHOT      6e923d0dbec1        About a minute ago   193.9 MB
    frolvlad/alpine-oraclejdk8              slim                3f6e317fc0fb        2 weeks ago          166.9 MB

    $ docker run -p 8080:8080 --name spr-boot-templ -t nicodewet/spring-boot-docker-template:0.0.1-SNAPSHOT

    $ docker ps
    CONTAINER ID        IMAGE                                                  COMMAND                  CREATED             STATUS              PORTS                    NAMES
    83429f3       nicodewet/spring-boot-docker-template:0.0.1-SNAPSHOT   "java -Djava.security"   25 seconds ago      Up 24 seconds       0.0.0.0:8080->8080/tcp   spr-boot-templ

#### mvn package docker:build

This builds the SNAPSHOT Spring Boot jar and wraps it with Docker as specified in the Dockerfile in src/main/docker.

The following configuration includes :${project.version} so that the Maven version number will become the Docker tag and so conceptually the Maven version number and the Docker tag are the same thing.

    <imageName>${docker.image.prefix}/${project.artifactId}:${project.version}</imageName>

#### docker images

This command confirms our expectations in terms of seeing a Docker image with REPOSITORY nicodewet/spring-boot-docker-template and TAG 0.0.1-SNAPSHOT.

#### docker run -p 8080:8080 --name spr-boot-templ -t nicodewet/spring-boot-docker-template:0.0.1-SNAPSHOT

Here we run the newly minted image and so it becomes a named container with the web app on port 8080.

#### docker ps

You can run this in another console tab. This is just a sanity check. Naturally you can just Ctrl + C to stop the container or docker stop spr-boot-templ.

#### 

## Cleanup

Delete all containers and images.

	./delete_all_containers_and_images.sh