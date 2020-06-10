# Auth server

Server for user authentication and authorization

## Installation

### Prerequisities

Ensure you have a running PostgreSQL (v 9+) server available.

### Steps

1. `git clone https://github.com/smetak13/auth-server.git`
2. `cd auth-server`
3. `cp .env.example.env .env`
4.  edit .env (mainly PostgreSQL connection parameters and token secrets)
5. `npm i`
6. `npm run init` (creates db tables)
7. `npm run create-user <username> <password> <firstname?> <lastname?>` (creates user)
8. `npm run dev`
