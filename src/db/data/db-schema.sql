DROP TABLE IF EXISTS "zsdis_admin_users";
CREATE TABLE "zsdis_admin_users"
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  created TIMESTAMP WITH TIME ZONE DEFAULT now()
);

