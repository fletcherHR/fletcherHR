CREATE DATABASE jobsearch;

USE jobsearch;

CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(45) NOT NULL,
  address varchar(255) NOT NULL
  PRIMARY KEY(ID)
);

CREATE TABLE favorites (
  ID int NOT NULL AUTO_INCREMENT,
  jobTitle varchar(255) NOT NULL,
  companyName varchar(255) NOT NULL,
  commuteTime int NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(userID) REFERENCES users(ID)
);