-- Create users table
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  activationLink VARCHAR(255),
  isActivated TINYINT DEFAULT 0,  -- Set to 1 to skip activation
  name VARCHAR(255),
  avatar VARCHAR(255)
);

-- Create groups table
CREATE TABLE `groups` (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  ownerId CHAR(36),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isPrivate BOOLEAN DEFAULT 0,
  description VARCHAR(255),
  invitationLink VARCHAR(8),
  FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Create members table
CREATE TABLE members (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  groupId CHAR(36),
  userId CHAR(36),
  joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role ENUM('admin', 'member') DEFAULT 'member',
  isMuted BOOLEAN DEFAULT 0,
  isBanned BOOLEAN DEFAULT 0,
  banReason VARCHAR(255),
  FOREIGN KEY (groupId) REFERENCES `groups`(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  UNIQUE KEY unique_member (groupId, userId)
);

-- Create messages table
CREATE TABLE messages (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  groupId CHAR(36),
  senderId CHAR(36),
  content TEXT,
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  editedAt TIMESTAMP DEFAULT NULL,
  isDeleted BOOLEAN DEFAULT 0,
  recipientId CHAR(36),
  replyToMessageId CHAR(36),
  FOREIGN KEY (groupId) REFERENCES `groups`(id),
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (recipientId) REFERENCES users(id),
  FOREIGN KEY (replyToMessageId) REFERENCES messages(id)
);

-- Create messaged_users table
CREATE TABLE messaged_users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  userId CHAR(36),
  targetUserId CHAR(36),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (targetUserId) REFERENCES users(id)
);

-- Insert test user
INSERT INTO users (id, email, password, name) VALUES ('3b1c7f4e-2d58-4f4a-9a17-1c6a3d4c7e55', 'test@gmail.com', '$2b$10$D72KnB8kOlnCy2xL8NFrYuJdVjK/0aXkLPSpQPp4Na9oivHGIK0dG', 'Test User');

-- Insert test group
INSERT INTO `groups` (id, name, ownerId) VALUES ('d6c8b1c4-8f7c-4a5d-9f3c-6f1a7e2c9b54', 'Test Group', '3b1c7f4e-2d58-4f4a-9a17-1c6a3d4c7e55');

-- Add user to group
INSERT INTO members (groupId, userId, role) VALUES ('d6c8b1c4-8f7c-4a5d-9f3c-6f1a7e2c9b54', '3b1c7f4e-2d58-4f4a-9a17-1c6a3d4c7e55', 'admin');