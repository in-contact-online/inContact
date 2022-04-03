DROP TABLE IF EXISTS statuses;
CREATE TABLE statuses(
	status_id SERIAL PRIMARY KEY,
	full_name VARCHAR (50),
	username VARCHAR (30),
	was_online VARCHAR (30),
	check_date VARCHAR (30)
);