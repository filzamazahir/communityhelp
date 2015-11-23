-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Community_Help_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Community_Help_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Community_Help_db` DEFAULT CHARACTER SET utf8 ;
USE `Community_Help_db` ;

-- -----------------------------------------------------
-- Table `Community_Help_db`.`locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Community_Help_db`.`locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lat` FLOAT NULL,
  `lng` FLOAT NULL,
  `comment` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;