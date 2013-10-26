Port: 3306
Root password: 9128

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
  `title` VARCHAR(113) NOT NULL ,
  `site` VARCHAR(50) NOT NULL ,
  `attr1` VARCHAR(50) NOT NULL,
  `attr1value` VARCHAR(50) NOT NULL,
  `attr2` VARCHAR(50) NOT NULL,
  `attr2value` VARCHAR(50) NOT NULL,
  `attr3` VARCHAR(50),
  `attr3value` VARCHAR(50),
  `source` VARCHAR(313) NOT NULL ,
  `pid` INT NOT NULL ,
  `picture` LONGBLOB NULL ,
  PRIMARY KEY (`pid`) );
  
  
  CREATE  TABLE `haksle`.`productlist` (
  `email` VARCHAR(50) NOT NULL ,
  `listname` VARCHAR(45) NOT NULL ,
  `listid` INT NOT NULL ,
  `pid` INT NULL ,
  PRIMARY KEY (`listid`) ,
  INDEX `email_idx` (`email` ASC) ,
  INDEX `pid_idx` (`pid` ASC) ,
  CONSTRAINT `email`
    FOREIGN KEY (`email` )
    REFERENCES `haksle`.`customer` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
 