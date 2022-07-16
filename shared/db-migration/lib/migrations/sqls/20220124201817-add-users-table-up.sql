DROP TABLE IF EXISTS users;
CREATE TABLE users (
     user_id        SERIAL PRIMARY KEY,
     username       VARCHAR (50) UNIQUE NOT NULL,
     first_name     VARCHAR (50) NULL DEFAULT NULL,
	second_name    VARCHAR (50) NULL DEFAULT NULL,
	phone          VARCHAR (50) NULL DEFAULT NULL,
     active         BOOLEAN NOT NULL DEFAULT FALSE,
	created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
     updated_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS tracked_phones;
CREATE TABLE tracked_phones (
     user_id        NUMERIC NOT NULL,
	tracked_phone  VARCHAR (50) NULL DEFAULT NULL,
     tracked        BOOLEAN NOT NULL DEFAULT FALSE,
	created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
     updated_at     TIMESTAMP NOT NULL DEFAULT NOW()
);
