#syntax=docker/dockerfile:1.12-labs

# put in Docker directives to describe how to create the container image

FROM node:23.8-alpine3.20 AS base-stage

# "development" or "production"
ARG ENVIRONMENT
ENV NODE_ENV=$ENVIRONMENT

ARG PORT
ENV PORT=$PORT

ARG CLERK_PUBLISHABLE_KEY
ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY

ARG CLERK_SECRET_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY

ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID

ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

ARG AWS_S3_BUCKET_NAME
ENV AWS_S3_BUCKET_NAME=$AWS_S3_BUCKET_NAME

FROM base-stage AS install-stage

# Copy ALL package.json files in our entire project folder into /dotaproject/, including the folders in the paths to those files...
# /dotaproject/app/package.json
# /dotaproject/app/other/package.json
# COPY --parents /package*.json /**/package*.json /dotaproject/

COPY /package.json /dotaproject/app/
COPY /client/package.json /dotaproject/app/client/

# Like the "cd" command. All following directives in this Dockerfile will be relative to /dotaproject/app inside the image.
WORKDIR /dotaproject/app

# Temporarily change the environment to "development" because you'll
# always need development dependencies, either for development enviornment
# OR for building a production build of the app.
ENV NODE_ENV="development"
# "clean install" installs all of our npm dependencies.
RUN npm ci
# Change the environment back for runtime.
ENV NODE_ENV=$ENVIRONMENT

# Copy our source code into the image.
COPY ./app .

# Allows network connections into the container through this port.
EXPOSE $PORT

# DEV STAGE
FROM install-stage AS dev-stage

CMD ["npm", "run", "dev"]

# PROD STAGE
FROM install-stage AS prod-stage

RUN npm run build

RUN npm prune --omit=dev

CMD ["npm", "run", "start"]

# CMD ["tail", "-f", "/dev/null"