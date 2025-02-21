source .env

docker container stop dotaproject-db
docker rm dotaproject-db
docker run \
  --detach \
  -p $DB_PORT:$DB_PORT \
  --name dotaproject-db \
  -v ./db/volumes/data:/var/lib/postgresql/data \
  -t dotaproject/db:1.0
