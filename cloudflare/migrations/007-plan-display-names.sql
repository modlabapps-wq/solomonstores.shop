-- Display names only. IDs, offers, prices, recurrence and licenses remain unchanged.
CREATE TABLE IF NOT EXISTS autokyro_plan_names_backup_20261114 AS SELECT * FROM cloud_plans WHERE id IN('mensal','trimestral','anual');
UPDATE cloud_plans SET name='Automatize Fácil Mensal' WHERE id='mensal' AND name='AutoKyro Mensal';
UPDATE cloud_plans SET name='Automatize Fácil Trimestral' WHERE id='trimestral' AND name='AutoKyro Trimestral';
UPDATE cloud_plans SET name='Automatize Fácil Anual' WHERE id='anual' AND name='AutoKyro Anual';
