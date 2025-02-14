source .env

docker container stop dotaproject-app
docker rm dotaproject-app
docker run \
  --detach \
  -p $PORT:$PORT \
  --name dotaproject-app \
  -t dotaproject/app:1.0

$SHELL