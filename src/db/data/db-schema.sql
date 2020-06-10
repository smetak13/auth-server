DROP TABLE IF EXISTS "auth_server_users";
CREATE TABLE "auth_server_users"
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  created TIMESTAMP WITH TIME ZONE DEFAULT now()
);

