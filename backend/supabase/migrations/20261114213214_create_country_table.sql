CREATE TABLE IF NOT EXISTS country (
    iso_2 TEXT PRIMARY KEY,
    iso_3 TEXT NOT NULL,
    iso_numeric SMALLINT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN country.iso_2 IS 'ISO 3166-1 alpha-2 (e.g., "US", "CA")';

COMMENT ON COLUMN country.iso_3 IS 'ISO 3166-1 alpha-3 (e.g., "USA", "CAN")';

COMMENT ON COLUMN country.iso_numeric IS 'Three digit country code defined by ISO (e.g., "840", "124")';

COMMENT ON COLUMN country.name IS 'Complete country name (e.g., "United States", "Canada")';