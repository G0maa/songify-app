# SRC: https://youtu.be/j61yfEfeJAE
* Note: I'm running this from codespaces 8GB Ram version, ~~moved to my own machine, seems 8 gigs (or CPU) isn't enough.~~, it works now.
0. Docker compose won't generate auto-configuration passwords.
1. You might have to run: `sysctl -w vm.max_map_count=262144`
2. `docker network create elastic`
3. `docker run --name es-node01 --net elastic -p 9200:9200 -p 9300:9300 -t docker.elastic.co/elasticsearch/elasticsearch:8.7.0`
4. `docker cp es-node01:/usr/share/elasticsearch/config/certs/http_ca.crt .`
5. verify it works. => `curl --cacert http_ca.crt -u elastic https://localhost:9200` & paste your password
6. To reset enrollment token (if needed): docker exec (google it) & `./bin/elasticsearch-create-enrollment-token -s kibana`
7. To reset password `./bin/elasticsearch-reset-password -u elastic`
7. `docker run --name kibana-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.0`
8. Go to the url and provide enrollment token then username & password.
9. You've got Elasticsearch & Kibana working.
---
# For metricbeat
1. `chmod go-w metricbeat.yml` to make it re-writeable again `chmod a+w metricbeat.yml`
2. `chown 0 metricbeat.yml` (in my case it's 0)
3. configure a certificate for SSL: `bin/elasticsearch-certutil cert --name es-node01 --self-signed`
4. copy the certificate `docker cp es-node01:/usr/share/elasticsearch/es-node01.p12 .`
5. I have not been able to make it work.
