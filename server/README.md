# Covent App Server

## Description

API Sever to handle patient management system in hospital.

## Quick Start

Run the server container

```
docker-compose up
```

Stop the server container

```
docker-compose down
```

## File Structure

`/routes`: API routing for the application

`/controllers`: Handler for each routes

`/repositories`: Interact with database and external APIs

`/models`: Model to interact with database

`/utils`: Utilities for the application

`/middlewares`: Contains middleware functions

In a nutshell:

`app.js -> routes -> controllers -> repositories -> response`
