#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
maat_dir=$(cd $bin_dir/../../../tmp/code-maat && pwd)
root_dir=$(cd $bin_dir/../.. && pwd)

cd $maat_dir

docker run -v $bin_dir:/data -it code-maat-app -l /data/logfile.log -c git2 > $bin_dir/logfile.csv
docker run -v $bin_dir:/data -it code-maat-app -l /data/logfile.log -c git2 -a revisions > $bin_dir/revisions.csv
docker run --rm -v $root_dir:/tmp aldanial/cloc ./src --unix --by-file --csv --quiet --report-file=./docs/code-maat/complexity.csv
