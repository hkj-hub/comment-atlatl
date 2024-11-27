#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)

python python/merge_comp_freqs.py revisions.csv complexity.csv
