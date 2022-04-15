ALTER TABLE users
RENAME COLUMN user_id TO id;

ALTER TABLE tracked_phones
ADD COLUMN id SERIAL PRIMARY KEY,
ADD COLUMN session_id NUMERIC,
ADD UNIQUE (user_id, tracked_phone);

DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions(
	id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    auth_key BYTEA NOT NULL,
    dc_id TEXT NOT NULL,
    server_address INET NOT NULL,
    port INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);