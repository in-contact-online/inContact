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
