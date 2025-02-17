source .env

docker container stop dotaproject-db
docker rm dotaproject-db
docker run \
  --detach \
  -p $DB_PORT:$DB_PORT \
  --name dotaproject-db \
  -t dotaproject/db:1.0

$SHELL