create table sensor (
                        id varchar(50) primary key,
                        name varchar(50) not null,
                        description text
);

create table device (
                        id varchar(50) primary key,
                        name varchar(50) not null,
                        description text
);

create table sensor_data (
                             id bigint primary key auto_increment,
                             SSId varchar(50) not null,
                             temp double,
                             humidity double,
                             light int,
                             time timestamp not null default current_timestamp,
                             foreign key (SSId) REFERENCES sensor(id)
);

create table device_action (
                               id bigint primary key auto_increment,
                               DVId varchar(50) not null,
                               action varchar(50) not null,
                               time timestamp not null default current_timestamp,
                               foreign key (DVId) REFERENCES device(id)
);

insert into sensor(id, name, description) values('SS01', 'dht11', 'đo nhiệt độ, độ ẩm');
insert into sensor(id, name, description) values('SS02', 'quang trở', 'đo ánh sáng');

insert into device(id, name, description) values('DV01', 'LED 1', 'đèn led');
insert into device(id, name, description) values('DV02', 'LED 2', 'đèn led');