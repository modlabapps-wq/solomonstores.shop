CREATE TABLE IF NOT EXISTS cloud_trial_invites (
  request_id TEXT NOT NULL,
  email TEXT NOT NULL,
  license_id TEXT NOT NULL REFERENCES cloud_licenses(id),
  delivery_id TEXT NOT NULL REFERENCES cloud_outbox(id),
  created_at TEXT NOT NULL,
  PRIMARY KEY(request_id,email)
);
