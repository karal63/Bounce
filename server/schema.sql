-- Create users table
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  activation_link VARCHAR(255),
  is_activated TINYINT DEFAULT 1,  -- Set to 1 to skip activation
  name VARCHAR(255),
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create groups table
CREATE TABLE `groups` (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create members table
CREATE TABLE members (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  group_id CHAR(36),
  user_id CHAR(36),
  role ENUM('admin', 'member') DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES `groups`(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_member (group_id, user_id)
);

-- Create messages table
CREATE TABLE messages (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  group_id CHAR(36),
  user_id CHAR(36),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES `groups`(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create messaged_users table
CREATE TABLE messaged_users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  userId CHAR(36),
  targetUserId CHAR(36),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (targetUserId) REFERENCES users(id)
)

-- Insert test user
INSERT INTO users (id, email, password, name, is_activated) VALUES ('3b1c7f4e-2d58-4f4a-9a17-1c6a3d4c7e55', 'test@gmail.com', '$2b$10$D72KnB8kOlnCy2xL8NFrYuJdVjK/0aXkLPSpQPp4Na9oivHGIK0dG', 'Test User', 1);

-- Insert test group
INSERT INTO `groups` (id, name, created_by) VALUES ('d6c8b1c4-8f7c-4a5d-9f3c-6f1a7e2c9b54', 'Test Group', '3b1c7f4e-2d58-4f4a-9a17-1c6a3d4c7e55');

-- Add user to group
INSERT INTO members (group_id, user_id, role) VALUES ('d6c8b1c4-8f7c-4a5d-9f3c-6f1a7e2c9b54', '3b1c7f4e-2d58-4f4a-9a17-1c6a3d4c7e55', 'admin');