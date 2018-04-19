create database eshopper_project;
	drop database eshopper_project;

create table category(
	id int,
	name varchar(255),
	count char(10)
);

insert into category values (1,'Mens Wear',200)
insert into category values (2,'Mens Wear tshirts',2354682937873478)

alter table category add column mobile int after name;
insert into category values (6,'Mens Wear tshirts',9870098700);

insert into category (id,name,mobile) values (6,'Mens Wear tshirts',9870098700);
	-- maximum value of int is 2147483647-->garbage value

alter table category drop column mobile;
alter table category add column mobile bigint after name;

insert into category (id,name,mobile) values (6,'Mens Wear tshirt',9870098700);

create table brands(
	id int auto_increment primary key,
	name varchar(255),
	count int
);

insert into brands (name,count) values ('adidas',10);
insert into brands (name,count) values ('pume',20);
insert into brands (name,count) values ('killer jeans',30);
insert into brands (name,count) values ('rayban',18);

delete from brands where id=3;
	insert into brands (name,count) values ('reliance',18);

-- ***deletes all record but doesn't set the primary-key
delete from brands;
	-- do insert

-- ***truncate and drop resets primary key	
truncate table brands;
	-- do insert
drop table brands;
	-- do insert
	-- update brands set name='jeans',count=90 -->will update all records
update brands set name='jeans',count=90 where id=3

-- FUNCTIONS
select count(id) from brands;
select count(*) from brands;
select count(*) as CNT from brands;

select sum(count) as TOTAL from brands;
select avg(count) as AVG from brands;
select max(count) as MAX from brands;
select min(count) as MIN from brands;

select * from brands;
select name,count from brands;
select name,count from brands where 1; --1 means no condition
select name,count from brands  where count>10;
select name,count from brands where name like 'a%';
select name,count from brands where name like '%s';
select name,count from brands where name like '%a%';


select name,count from brands where count>10 and count<100;
select name,count from brands where count between 10 and 90;
select name,count from brands where id=2 or id=3 or id=10;
select name,count from brands where id=2 and id=3 and id=10;

select name,count from brands where id in(2,3,10);--same as or








