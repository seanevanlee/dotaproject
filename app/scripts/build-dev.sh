source .env

# "-f ./app/Dockerfile" says which Dockerfile to use
# "." says what build context to use
docker build \
  --target dev-stage \
  -t dotaproject/app:1.0 \
  --build-arg ENVIRONMENT=$ENVIRONMENT \
  --build-arg PORT=$PORT \
  --build-arg CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY \
  --build-arg CLERK_SECRET_KEY=$CLERK_SECRET_KEY \
  --build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
  --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  --build-arg AWS_S3_BUCKET_NAME=$AWS_S3_BUCKET_NAME \
  -f ./app/Dockerfile \
.