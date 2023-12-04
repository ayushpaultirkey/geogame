CREATE DATABASE `sns`;

CREATE TABLE `sns-user` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `Name` TEXT NOT NULL,
    `Username` TEXT NOT NULL,
    `Password` TEXT NOT NULL,
PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE `sns-quiz` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `Title` TEXT NOT NULL,
    `Description` TEXT NOT NULL,
    `Hint` TEXT NOT NULL,
    `Address` TEXT NOT NULL,
    `Coordinate` TEXT NOT NULL,
PRIMARY KEY (`id`))
ENGINE = InnoDB;
ALTER TABLE `sns-quiz` ADD `State` TEXT NOT NULL AFTER `Coordinate`;
ALTER TABLE `sns-quiz` ADD `Thumbnail` TEXT NOT NULL AFTER `State`;
ALTER TABLE `sns-quiz` CHANGE `State` `Address` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;

CREATE TABLE `sns-image` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `QuizID` BIGINT NOT NULL,
    `Link` TEXT NOT NULL,
PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE `sns-post` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `UserID` BIGINT NOT NULL,
    `Content` TEXT NOT NULL,
    `Address` TEXT NOT NULL,
    `Coordinate` TEXT NOT NULL,
    `Date` DATE NOT NULL,
PRIMARY KEY (`id`))
ENGINE = InnoDB;
ALTER TABLE `sns-post` ADD `Address` TEXT NOT NULL AFTER `Coordinate`;
ALTER TABLE `sns-post` ADD `AddressObject` TEXT NOT NULL AFTER `Coordinate`;

DROP TABLE `sns-user`;
DROP TABLE `sns-quiz`;
DROP TABLE `sns-post`;
DROP TABLE `sns-image`;

DROP DATABASE `sns`;