#!/bin/bash
set -e

env

# token=$(curl -s -XPOST \
#     -H "authorization: token ${PAT}" \
#     https://api.github.com/repos/stephen-cloud/cdk-github-actions/actions/runners/registration-token |\
#     jq -r .token)

# echo token $token

./config.sh --url https://github.com/cloudy-native/cdk-example-for-github-actions --token AACWFMWLQE7D67NWZBRK5WLAL2HDG

./run.sh
