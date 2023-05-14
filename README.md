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
  - Two versions of search
    - Using PostgreSQL queries
    - Using ElasticSearch
  - Two versions of recommenndations
    - Using a pre-made CSV file that was made by [Jonathan Monir]('https://github.com/Jonathan-Monir')
    - or by connecting to a running insance of [Songify-ML]('https://github.com/G0maa/songify-ml/')

## Currently working on

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
