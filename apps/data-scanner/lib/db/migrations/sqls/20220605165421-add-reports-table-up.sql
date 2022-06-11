DROP TABLE IF EXISTS reports;
CREATE TABLE reports(
	id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    data TEXT NOT NULL,
    type VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL
);
