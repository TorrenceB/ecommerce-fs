create table if NOT EXISTS origin (
    id UUID PRIMARY KEY NOT NULL,
    country TEXT NOT NULL,
    region TEXT NOT NULL,
    producer TEXT, -- farm or co - op nullable, not every lot has one
    altitude_meters int4range,
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);