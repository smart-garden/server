# SmartGarden Server

SmartGarden server contains all server logic for the SmartGarden platform. This includes a web server to route http requests, database and arduino clients, and a web application.

## Dependencies

Download and install the following software:

1. [Git](https://git-scm.com/downloads)
2. [Node.js](https://nodejs.org/en/download/)
3. Redis Server
    - [Windows](https://github.com/MSOpenTech/redis/releases/tag/win-2.8.2400)
    - [Mac](http://redis.io/download)
    - Ubuntu

            ```bash
            sudo apt-get install redis-server
            ```

4.  PostgreSQL
	- [Windows](https://www.postgresql.org/download/windows/)
	- [Mac](https://www.postgresql.org/download/macosx/)
	- Ubuntu

			```bash
			sudo apt-get install postgresql-9.4
			```

## Setup

Download the project:

```bash
$ git clone https://github.com/smart-garden/server.git server
```

Install dependencies:

```bash
$ npm install
$ bower install
```

Create a config file in the main directory. Name your file "config.js".
Copy and paste this code and fill in the necessary info.

```javascript
var config = {
module.exports = {
  redis_secret: "make_your_own_secret",
  postgres_href: "postgress://username:password@localhost:5432/database_name"
}
```

1. During installation set port and superuser password.
2. To create database use the following command:

	```bash
	psql -h localhost -U username
	CREATE DATABASE dbname
	```
3. access database:

	```bash
	psql -h localhost -U username -d dbname
	```
