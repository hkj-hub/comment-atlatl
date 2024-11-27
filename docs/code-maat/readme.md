```
./create_log.sh
./build-docker.sh
./summary-csv.sh
./csv-to-comp.sh
./csv-to-d3-json.sh
```

sh|説明
--|--
./build-docker.sh|code-maatのDockerfileをビルド
./create_log.sh|gitのコミットログを出力。1年分
./summary-csv.sh|コミットログからrevisions.csvを生成。ソースコードからcomplexity.csvを生成
./csv-to-comp.sh|revisions.csvとcomplexity.csvから変更頻度とコードの行数の紐づけを出力
./csv-to-d3-json.sh|revisions.csvとcomplexity.csvからd3へのインプットとなるJSONを生成

hotspots.jsonができたら下記で確認できる。

```
python -m http.server 8080
```

http://localhost:8080/crime-scene-hotspots.html