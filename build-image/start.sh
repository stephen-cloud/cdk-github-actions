#!/bin/bash
set -e

env

mkdir actions-runner && cd actions-runner
curl -O -L https://github.com/actions/runner/releases/download/v2.274.2/actions-runner-linux-x64-2.274.2.tar.gz
tar xzf ./actions-runner-linux-x64-2.274.2.tar.gz

token=$(curl -s -XPOST \
    -H "authorization: token ${PAT}" \
    https://api.github.com/repos/stephen-cloud/cdk-github-actions/actions/runners/registration-token |\
    jq -r .token)

./config.sh --url https://github.com/stephen-cloud/cdk-github-actions --token $token
# ./config.sh --url $URL --token $PAT --name "aws-runner-$(hostname)" --work _work
./run.sh
