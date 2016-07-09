# template-spring-boot-docker
Template Spring Boot Docker Project

## Key Aspects 

The idea behind this template is for you to be able to clone it and quickly start using it in your enterprise with the following way of working:

* Use spring-boot-starter-parent as your parent POM.
* Docker tags will must use the familiar and well understood Maven versioning scheme. 
* Build the docker image using com.spotify's docker-maven-plugin.

## Build and Run

    mvn package docker:build

    docker images
    
    Nicos-Air:template-spring-boot-docker nico$ docker images
    REPOSITORY                              TAG                 IMAGE ID            CREATED              SIZE
    nicodewet/spring-boot-docker-template   0.0.1-SNAPSHOT      6e923d0dbec1        About a minute ago   193.9 MB
    frolvlad/alpine-oraclejdk8              slim                3f6e317fc0fb        2 weeks ago          166.9 MB

    docker run -p 8080:8080 -t nicodewet/spring-boot-docker-template:0.0.1-SNAPSHOT

## Cleanup

Delete all containers and images.

	./delete_all_containers_and_images.sh