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
  pid                       integer auto_increment not null,
  title                     varchar(255),
  site                      varchar(255),
  source                    varchar(255),
  attr1                     varchar(255),
  attr1value                varchar(255),
  attr2                     varchar(255),
  attr2value                varchar(255),
  attr3                     varchar(255),
  attr3value                varchar(255),
  picture                   varchar(255),
  constraint pk_product primary key (pid))
;

create table product_list (
  listid                    integer auto_increment not null,
  listname                  varchar(255),
  email                     varchar(255),
  pid                       integer,
  constraint pk_product_list primary key (listid))
;




# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table customer;

drop table product;

drop table product_list;

SET FOREIGN_KEY_CHECKS=1;

