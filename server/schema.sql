-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
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
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create members table
CREATE TABLE members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT,
  user_id INT,
  role ENUM('admin', 'member') DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES `groups`(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_member (group_id, user_id)
);

-- Create messages table
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES `groups`(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert test user
INSERT INTO users (email, password, name, is_activated) VALUES ('test@gmail.com', '$2b$10$D72KnB8kOlnCy2xL8NFrYuJdVjK/0aXkLPSpQPp4Na9oivHGIK0dG', 'Test User', 1);

-- Insert test group
INSERT INTO `groups` (name, created_by) VALUES ('Test Group', 1);

-- Add user to group
INSERT INTO members (group_id, user_id, role) VALUES (1, 1, 'admin');