source .env

# "-f ./db/Dockerfile" says which Dockerfile to use
# "." says what build context to use
docker build \
  -t dotaproject/db:1.0 \
  --build-arg PORT=$DB_PORT \
  --build-arg DB_NAME=$DB_NAME \
  --build-arg PASSWORD=$DB_PASSWORD \
  -f ./db/Dockerfile \
.