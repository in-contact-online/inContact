ALTER TABLE sessions
DROP COLUMN active,
DROP COLUMN phone,
    ALTER COLUMN id SET DATA TYPE VARCHAR(20);

ALTER TABLE tracked_phones
    ALTER COLUMN session_id SET DATA TYPE VARCHAR(20);
