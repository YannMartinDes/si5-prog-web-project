# ProgWeb Project - Team LMNT

ProgWeb Project : Client and Server Side

## Project URL 

[ProgWebProject](https://github.com/SI5-QTYY-Web/si5-prog-web-project) : link to our
github repository

## Subject

## Structure

- [client](web/packages/frontend/src): Client application (React, JSX, TypeScript).
- [server](web/packages/backend/src): Services (NestJS, TypeScript).
- [postman](postman): Postman collection.
- [deliverables](deliverables): Deliverables.

## Requirements

- Install [Docker](https://docs.docker.com/engine/install/).
- Install [Docker Compose](https://docs.docker.com/compose/install/).
- Install [Node.js](https://nodejs.org/en/download/).
- Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Prepare the project

- Go to the project directory:

```bash
cd web/
```

- Install the dependencies:

```bash
npm install
```

## Run

### Prerequisites

- You must have install the dependencies as shown before with npm install.
- You must have start the database in order for the client and server to work properly

### Commands

- Start the database (in the web directory):

```bash
docker-compose up
```

- Start the client and the server (in the web directory):

```bash
nx run-many --all --target=serve
```

## Stop

- Stop the client and the server:

Simply press ctrl+C to stop the execution of the client and the server.

- Stop the database:

Press ctrl+C to stop the execution of the database and then use the following command to stop the 
docker container : 

```bash
docker-compose down
```

- To check if no container is still running

If you want to be sure no docker process is still running, you can check that up by running the
following command and visualize it:
```bash
docker ps -a
```

## Authors

This follows the following format : 

[NomEtudiant PrenomEtudiant](link to github page) : IdentifiantGithub

- [Larose Quentin](https://github.com/QuentinLarose) : QuentinLarose
- [Martin D'Escrienne Yann](https://github.com/Mentra20) : Mentra20
- [Nersissian Tigran](https://github.com/TIGRAN06) : TIGRAN06
- [Tognetti Yohann](https://github.com/Idrash) : Idrash
