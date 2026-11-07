ALTER TABLE cloud_sessions ADD COLUMN admin_email TEXT;
-- Existing admin sessions use the sole owner's password or allowlisted email login.
UPDATE cloud_sessions SET admin_email='rignis1212@gmail.com' WHERE role='admin';
