DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gardens CASACADE;
/* Tim's Contribution */
DROP TABLE IF EXISTS garden_ownership CASCADE;
DROP TABLE IF EXISTS levels CASACADE;
DROP TABLE IF EXISTS pods CASCADE;
DROP TABLE IF EXISTS plants CASACADE;
/* end Tim's Contribution*/

CREATE TABLE states (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE location (
	id SERIAL PRIMARY KEY,
	Address char(255) NOT NULL UNIQUE,
	ZIP INTEGER NOT NULL,
	state_id INTEGER REFERENCES states (id) NOT NULL
);

/* Begin Tim's Contribution */
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	email CITEXT NOT NULL UNIQUE,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	reg_date INTEGER NOT NULL
);

CREATE TABLE gardens (
	id SERIAL PRIMARY KEY,
	water_usage INTEGER NOT NULL,
	power_usage INTEGER NOT NULL,
	reg_date INTEGER NOT NULL
	location_id FOREIGN KEY REFERENCES locations (id)
);

CREATE TABLE garden_ownership (
	id SERIAL PRIMARY KEY,
	user_id FOREIGN KEY REFERENCES users(id),
	garden_id FOREIGN KEY REFERENCES gardens(id)
);
/* Redefine CHECK CONSTRAINTS after research how to check that the level 
	or pod number is not already in use on the garden or level based on
	garden or level id */
CREATE TABLE levels (
	id SERIAL PRIMARY KEY,
	sku TEXT NOT NULL UNIQUE,
	level_num INT NOT NULL CHECK(/* level# does not exist on current garden */),
	garden_id FOREIGN KEY REFERENCES gardens(id)
),

CREATE TABLE pods (
	id SERIAL PRIMARY KEY,
	port_num INT NOT NULL CHECK(/* port# does not exist on current level */),
	level_id FOREIGN KEY REFERENCES levels(id),
	plant_id FOREIGN KEY REFERENCES plants(id)
);
/* End Redefine */

CREATE TABLE plants (
	id SERIAL PRIMARY KEY,
	reference_data INT, 
);
/* End Tim's Contribution*/