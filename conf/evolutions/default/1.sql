# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table customer (
  email                     varchar(255) not null,
  password                  varchar(255),
  firstname                 varchar(255),
  lastname                  varchar(255),
  birthdate                 varchar(255),
  gender                    varchar(255),
  alerttext                 integer,
  alertmail                 integer,
  constraint pk_customer primary key (email))
;

create table product (
  pid                       bigint auto_increment not null,
  title                     varchar(255),
  site                      varchar(255),
  source                    varchar(255),
  attr1                     varchar(255),
  attr1value                varchar(255),
  attr2                     varchar(255),
  attr2value                varchar(255),
  attr3                     varchar(255),
  attr4value                varchar(255),
  picture                   varchar(255),
  constraint pk_product primary key (pid))
;

create table test_product (
  id                        bigint auto_increment not null,
  url                       varchar(255),
  name                      varchar(255),
  price                     varchar(255),
  constraint pk_test_product primary key (id))
;




# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table customer;

drop table product;

drop table test_product;

SET FOREIGN_KEY_CHECKS=1;

