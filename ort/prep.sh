#!/bin/bash

set -x

git clone  --depth 1 https://github.com/oss-review-toolkit/ort.git /tmp/ort
DOCKER_BUILDKIT=1 docker build -t ort/ort /tmp/ort
mkdir -p conf
curl -L https://github.com/oss-review-toolkit/ort/raw/master/examples/rules.kts > conf/rules.kts
curl -L https://github.com/oss-review-toolkit/ort/raw/master/examples/license-classifications.yml > conf/license-classifications.yml
curl -L https://github.com/oss-review-toolkit/ort/raw/master/examples/curations.yml > conf/curations.yml

curl https://research-software.nl/api/software > software.json
jq -r '.[].repositoryURLs.github[0]|ltrimstr("https://github.com/")' < software.json |grep -v null > repos.txt
