Port: 3306
Root password: 123123

Haksle User:
Username: haksledbadmin
Host: All Hosts
Role: Db Admin
Authentication: Mysql
Password: hak12345

CREATE SCHEMA `haksle` DEFAULT CHARACTER SET utf16 ;

CREATE  TABLE `haksle`.`customer` (
  `email` VARCHAR(50) NOT NULL ,
  `password` VARCHAR(10) NOT NULL ,
  `firstname` VARCHAR(45) NULL ,
  `lastname` VARCHAR(45) NULL ,
  `birthdate` DATE NULL ,
  `gender` VARCHAR(6) NULL ,
  `alerttext` TINYINT(1) NULL ,
  `alertmail` TINYINT(1) NULL ,
  PRIMARY KEY (`email`) );
  
  CREATE  TABLE `haksle`.`product` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(113) NOT NULL ,
  `site` VARCHAR(50) NOT NULL ,
  `source` VARCHAR(313) NOT NULL ,
  `initialprice` DOUBLE DEFAULT 0,
  `currentprice` DOUBLE DEFAULT 0,
  `issoldout` TINYINT(1) DEFAULT 0,
  `isinbasket` TINYINT(1) DEFAULT 0,
  `picture` LONGBLOB NULL ,
  PRIMARY KEY (`pid`) );
   
  CREATE  TABLE `haksle`.`product_list` (
  `listid` INT NOT NULL AUTO_INCREMENT,
  `listname` VARCHAR(45) NOT NULL ,
  `pid` INT NULL,
  `email` VARCHAR(50) NOT NULL ,
  `desireddiscount` INT DEFAULT 100,
  `isinbasket` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`listid`) ,
  INDEX `email_idx` (`email` ASC) ,
  INDEX `pid_idx` (`pid` ASC) ,
  CONSTRAINT `email`
    FOREIGN KEY (`email` )
    REFERENCES `haksle`.`customer` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
 