# car booking

This needs [Node.js to be installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), followed by some libraries. The steps are listed below.

## Setup

- `Install `  [Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- `Install ` [Postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)
- `Import db file from postgres.sql`
```
- node version >= v12.20.2
- npm version >= 6.14.11
- node -v && npm -v
``` 

#### Project setup with node
```
- npm install
- npm run dev (development nodemon)
- npm start 
```
#### Project setup with docker and docker compose
```
- docker-compose build
- docker-compose up
```

#### Import Postman Collection
```
- import postman collection to postman from file car booking.postman_collection.json
- Auth using bearer token except for login and register
```

### Test Scripts
Tests are written using [Mocha](https://mochajs.org/) 
```
- npn run test
```

