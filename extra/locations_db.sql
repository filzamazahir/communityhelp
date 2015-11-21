-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema locations_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema locations_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `locations_db` DEFAULT CHARACTER SET utf8 ;
USE `locations_db` ;

-- -----------------------------------------------------
-- Table `locations_db`.`locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locations_db`.`locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lat` FLOAT NULL,
  `long` FLOAT NULL,
  `comment` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
