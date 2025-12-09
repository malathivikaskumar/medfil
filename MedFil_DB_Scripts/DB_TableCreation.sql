create database medfil;
use medfil;
create table user_login_tbl (
user_id int auto_increment primary key not null,
first_name varchar(30),
last_name varchar(30),
user_email varchar(30),
user_password varchar(30),
is_merchant int
);

create table shop_tbl(
shop_id int auto_increment primary key,
shop_name varchar(50),
address varchar(100),
colony varchar(50),
town varchar(30),
district varchar(30),
state varchar(30),
country varchar(30),
pincode int,
user_id int,
foreign key (user_id) references user_login_tbl(user_id)
);


create table medicine_tbl(
med_id int auto_increment primary key,
med_name varchar(30),
med_quantity int,
med_image blob,
med_expiry_date date,
med_description varchar(1000),
med_cost decimal(10,2),
shop_id int,
foreign key (shop_id) references shop_tbl(shop_id)
);