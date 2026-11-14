-- Existing monthly Cakto offer verified in the dashboard, 2026-11-13.
-- Keep price, recurrence, plan ID and all customer licenses unchanged.
CREATE TABLE IF NOT EXISTS autokyro_plan_checkout_fix_20261113 AS
SELECT * FROM cloud_plans WHERE id IN ('mensal','start');
INSERT INTO autokyro_plan_checkout_fix_20261113
SELECT * FROM cloud_plans WHERE id='start'
AND NOT EXISTS (SELECT 1 FROM autokyro_plan_checkout_fix_20261113 WHERE id='start');
-- Retired Start plan retains its ID and licenses, but no longer claims the
-- offer now sold as the one-device monthly subscription.
UPDATE cloud_plans SET provider_offer_id=NULL
WHERE id='start' AND enabled=0 AND provider_offer_id='3d7xuww'
AND NOT EXISTS (
  SELECT 1 FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id
  WHERE l.plan_id='start' AND c.email<>'rignis1212@gmail.com'
);
UPDATE cloud_plans
SET provider_offer_id='3d7xuww',
    checkout_url='https://pay.cakto.com.br/3d7xuww_1273485',
    updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE id='mensal'
  AND provider_product_id='1e10854d-4640-4c9d-9bfc-435a166ca7ac'
  AND provider_offer_id='8hsnajf'
  AND checkout_url='https://pay.cakto.com.br/8hsnajf'
  AND price_cents=2990 AND period_days=30;
