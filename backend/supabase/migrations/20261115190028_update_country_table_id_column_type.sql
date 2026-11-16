-- Change origin.id type from uuid to smallint. Origin table contains small, fixed amount of origins
-- not created by users and never addressed by id in a public url. Other curated reference tables
-- (process, roast-level) also use smallint as PK's, assigning one to origin as well enforces this pattern.
ALTER TABLE origin DROP COLUMN id;

ALTER TABLE origin
ADD COLUMN id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY;