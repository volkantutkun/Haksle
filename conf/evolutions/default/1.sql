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
  id                        bigint auto_increment not null,
  url                       varchar(255),
  name                      varchar(255),
  price                     varchar(255),
  constraint pk_product primary key (id))
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

