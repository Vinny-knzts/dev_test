CREATE DATABASE IF NOT EXISTS test_db;

USE test_db;

CREATE TABLE IF NOT EXISTS user (
	id INT AUTO_INCREMENT,
  firstName varchar(100) NOT NULL,
  lastName varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS post (
  id INT AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  description varchar(100) NOT NULL,
  userId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) references user(id)
);
