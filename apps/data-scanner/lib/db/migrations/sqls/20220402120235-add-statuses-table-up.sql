DROP TABLE IF EXISTS statuses;
CREATE TABLE statuses(
	status_id SERIAL PRIMARY KEY,
	phone_number TEXT NOT NULL,
	username TEXT,
	was_online TIMESTAMP,
	check_date TIMESTAMP NOT NULL
);