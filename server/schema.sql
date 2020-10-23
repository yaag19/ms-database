DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;
USE chat;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) not NULL
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `text` varchar(255) not NULL,
  `roomname` varchar(255) not NULL,
  `userId` int,
  `created_at` timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/