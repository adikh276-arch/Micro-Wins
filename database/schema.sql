CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS micro_wins (
  id UUID PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  win TEXT NOT NULL,
  reflection TEXT,
  date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
