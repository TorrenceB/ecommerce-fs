-- Origins for the demo catalog, leaning Costa Rican. Regions, altitudes and
-- coordinates are realistic (coordinates are approximate, region-level);
-- producer names are fictional.
--
-- origin.id is GENERATED ALWAYS, so ids are never hardcoded here. Child seeds
-- look origins up by (country_id, region, producer).
--
-- altitude_meters uses inclusive bounds '[low,high]'; Postgres canonicalizes
-- int4range to '[low,high+1)' on read.
INSERT INTO origin (country_id, region, producer, altitude_meters, latitude, longitude)
VALUES
    ('CR', 'Tarrazú',        'Finca Cerro Alto',      '[1500,1900]',  9.660000,  -84.020000),
    ('CR', 'Tarrazú',        NULL,                    '[1200,1900]',  9.640000,  -84.050000), -- community lot, no single producer
    ('CR', 'West Valley',    'Finca El Mirador',      '[1300,1700]', 10.100000,  -84.380000),
    ('CR', 'Central Valley', 'Micro Beneficio Poás',  '[1400,1700]', 10.080000,  -84.230000),
    ('CR', 'Tres Ríos',      'Finca La Cumbre',       '[1200,1650]',  9.910000,  -83.990000),
    ('CR', 'Brunca',         'Finca Río Chirripó',    '[1000,1600]',  9.370000,  -83.700000),
    ('ET', 'Yirgacheffe',    NULL,                    '[1750,2200]',  6.160000,   38.200000), -- washing-station lot
    ('PA', 'Boquete',        'Finca Volcán Escondido','[1500,1800]',  8.780000,  -82.440000);
