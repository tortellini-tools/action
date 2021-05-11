#!/bin/sh

set -x

echo $1

mkdir -p out/$repo

git clone --depth 1 https://github.com/$1 /tmp/repo

time docker run --rm -ti -v /tmp/repo:/project -v $PWD/out/$1:/out ort analyze -i /project -o /out

docker run --rm -ti -v /tmp/repo:/project -v $PWD/out/$1:/out -v $PWD/conf:/conf \
  ort evaluate \
  --package-curations-file /conf/curations.yml \
  --rules-file /conf/rules.kts \
  --license-classifications-file /conf/license-classifications.yml \
  -i /out/analyzer-result.yml \
  -o /out

docker run --rm -ti -v /tmp/repo:/project -v $PWD/out/$1:/out \
   ort report \
  -f NoticeTemplate,StaticHtml,WebApp,EvaluatedModel,GitLabLicenseModel,SpdxDocument,StaticHtml,CycloneDx \
  -i /out/evaluation-result.yml \
  -o /out

docker run --rm -ti -v /tmp:/temp --entrypoint rm ort -rf /temp/repo