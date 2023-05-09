FROM node:18.16-alpine3.16

WORKDIR /api

COPY . .

# RUN npm install --global yarn @nestjs/cli

RUN yarn install

RUN mv .sample.env .env

# Assuming you have not changed postgres password & username
# ENV DATABASE_URL=postgres://root:sekret@songify-dev-db:5432/postgres?schema=public

RUN yarn run build

RUN yarn prisma generate

USER node

CMD ["node", "dist/src/main.js"]


