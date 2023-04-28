[![codecov](https://codecov.io/gh/G0maa/songify-app/branch/master/graph/badge.svg?token=LULJAISO7Y)](https://codecov.io/gh/G0maa/songify-app)
![CI Pipeline Status](https://github.com/g0maa/songify-app/actions/workflows/ci.yml/badge.svg)

# Songify-app | api

- A Music recommendation website, this repo covers the API part.
- Features:
  - Searching for Tracks
  - Trending Tracks
  - User
    - Authentication
    - History
    - Favorites
    - Profile
- Currently working on:
  - Recommending tracks based on content-based filtering
    - Use of RabbitMQ as a message broker between NestJS App & Python ML Model
  - Search using ElasticSearch
  - Deployment on AWS

## Tech stack

- NestJS
- Prisma
- PostgreSQL
- PassportJS
- RabbitMQ
- ...

## Live Version:

- To-do...

## Prerequisites:

1. Docker for running PostgreSQL (or any other source for a PostgreSQL instance).
2. NodeJS
3. Install Yarn & Nest CLI `npm install --global yarn @nestjs/cli`

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# For env vars
$ mv .sample.env .env

# Creating docker container
$ yarn run db:up

# Pushing db schema to docker
$ yarn run db:push

# running api tests and making sure everything is ok
# note: I use the same container for testing and development.
$ yarn run test

# running server
# You can access API Docs at http://lcoalhost:8080/api-docs
$ yarn run dev
```
