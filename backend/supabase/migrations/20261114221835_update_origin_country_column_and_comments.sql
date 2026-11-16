-- Replace "origin.country" with "origin.country_id" and backfill
ALTER TABLE origin ADD COLUMN country_id TEXT NULL;

UPDATE origin o
SET
    country_id = c.iso_2
FROM country c
WHERE
    LOWER(TRIM(o.country)) = LOWER(TRIM(c.name))
    AND o.country_id IS NULL;

-- Fail loudly on any origin.country that didn't match a country.name
DO $$
DECLARE
    unmatched TEXT;
BEGIN
    SELECT string_agg(DISTINCT country, ', ')
    INTO unmatched
    FROM origin
    WHERE country_id IS NULL;

    IF unmatched IS NOT NULL THEN
        RAISE EXCEPTION 'Backfill failed; unmatched origin.country values: %', unmatched;
    END IF;
END $$;

ALTER TABLE origin ALTER COLUMN country_id SET NOT NULL;

ALTER TABLE origin
ADD CONSTRAINT origin_country_id_fk FOREIGN KEY (country_id) REFERENCES country (iso_2);

ALTER TABLE origin DROP COLUMN country;

-- Add index on new "origin.country_id" column
CREATE INDEX origin_country_id_idx ON origin (country_id);

-- Add comments on columns
COMMENT ON COLUMN origin.country_id IS 'Foreign key reference to country.iso_2 PK.';

COMMENT ON COLUMN origin.region IS 'Area in "Bean Belt" where coffee origin exists.';

COMMENT ON COLUMN origin.producer IS 'Coffee origin producer name.';

COMMENT ON COLUMN origin.altitude_meters IS 'Altitude in meters at which origin exists.';

COMMENT ON COLUMN origin.latitude IS 'North-South coordinate of origin location on Earth.';

COMMENT ON COLUMN origin.longitude IS 'East-West coordinate of origin location on Earth.';