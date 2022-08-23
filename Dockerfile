FROM ubuntu:18.04 
ENV CI=true
ENV PIP_IGNORE_INSTALLED=0

WORKDIR /app

## install R 
## to stop interactve  input tzdata (timezone)
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Africa/Lagos
RUN  apt-get update && apt-get -y install r-base r-base-dev


COPY scripts/ ./scripts/

RUN apt-get install -y dos2unix
RUN dos2unix /app/scripts/script.sh
RUN chmod 775 /app/scripts/script.sh


#ENTRYPOINT ["bash", "/app/scripts.sh"]
CMD ["bash", "/app/scripts/script.sh"]


