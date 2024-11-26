#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
maat_dir=$(cd $bin_dir/../../../tmp/code-maat && pwd)

cd $maat_dir

docker run -v $bin_dir:/data -it code-maat-app -l /data/logfile.log -c git2 > $bin_dir/logfile.csv

