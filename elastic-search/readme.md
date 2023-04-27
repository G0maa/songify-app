# SRC: https://youtu.be/j61yfEfeJAE
* Note: I'm running this from codespaces 8GB Ram version, moved to my own machine, seems 8 gigs (or CPU) isn't enough.
0. Docker compose won't generate auto-configuration passwords.
1. You might have to run: `sysctl -w vm.max_map_count=262144`
2. `docker network create elastic`
3. `docker run --name es-node01 --net elastic -p 9200:9200 -p 9300:9300 -t docker.elastic.co/elasticsearch/elasticsearch:8.7.0`
4. `docker cp es-node01:/usr/share/elasticsearch/config/certs/http_ca.crt`
5. verify it works. => `curl --cacert http_ca.crt -u elastic https://localhost:9200` & paste your password
6. To reset enrollment token (if needed): docker exec (google it) & `./bin/elasticsearch-create-enrollment-token -s kibana`
7. `docker run --name kibana-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.0`
8. Go to the url and provide enrollment token then username & password.
9. You've got Elasticsearch & Kibana working.
