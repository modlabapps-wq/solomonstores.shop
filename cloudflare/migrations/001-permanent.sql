ALTER TABLE cloud_licenses ADD COLUMN is_permanent INTEGER NOT NULL DEFAULT 0 CHECK(is_permanent IN(0,1));
CREATE UNIQUE INDEX cloud_one_permanent_per_customer ON cloud_licenses(customer_id) WHERE is_permanent=1;
