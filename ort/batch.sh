#!/bin/sh

set -x

for repo in $(cat repos.txt)
do
echo $repo
mkdir -p out/$repo
./run.sh $repo > out/$repo/out.txt 2> out/$repo/err.txt
done