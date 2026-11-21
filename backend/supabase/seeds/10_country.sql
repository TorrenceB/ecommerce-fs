-- Countries referenced by seeded origins. Not the full ISO 3166-1 list; whether
-- that list is reference data (belongs in a migration) or seed data is still open.
-- Codes per ISO 3166-1: alpha-2, alpha-3, numeric.
INSERT INTO country (iso_2, iso_3, iso_numeric, name)
VALUES
    ('CR', 'CRI', 188, 'Costa Rica'),
    ('ET', 'ETH', 231, 'Ethiopia'),
    ('PA', 'PAN', 591, 'Panama');
