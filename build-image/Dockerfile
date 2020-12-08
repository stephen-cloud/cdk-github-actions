FROM ubuntu:16.04

ENV DEBIAN_FRONTEND=noninteractive
ENV RUNNER_ALLOW_RUNASROOT=true

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    jq \
    git \
    iputils-ping \
    libcurl3 \
    libicu55 \
    libunwind8 \
    netcat \
    awscli

RUN mkdir actions-runner && cd actions-runner
RUN curl -O -L https://github.com/actions/runner/releases/download/v2.274.2/actions-runner-linux-x64-2.274.2.tar.gz
RUN tar xzf ./actions-runner-linux-x64-2.274.2.tar.gz

COPY ./start.sh .
RUN chmod +x start.sh
RUN ls -lt

CMD ["./start.sh"]
