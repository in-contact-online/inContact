ALTER TABLE sessions 
    ADD COLUMN valid BOOLEAN DEFAULT TRUE, 
    ADD COLUMN is_full BOOLEAN DEFAULT FALSE;

ALTER TABLE tracked_phones 
    ALTER COLUMN session_id SET DEFAULT NULL;