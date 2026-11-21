ALTER TABLE origin
ADD CONSTRAINT unique_origin_country_id_region_producer_key UNIQUE NULLS NOT DISTINCT (country_id, region, producer);