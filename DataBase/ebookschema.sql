use ebook;
create table books (
	bookid integer primary key AUTO_INCREMENT,
    bookname varchar(255),
    isbnnum varchar(255),
    author varchar(255),
    storage integer,
    price float,
    imgurl varchar(255)
);

create table user(
	id integer PRIMARY key AUTO_INCREMENT,
    accountname varchar(255),
    email varchar(255),
    pwd varchar(255),
    isadmin boolean default 0
);

create table orders(
	orderid integer primary key AUTO_INCREMENT,
    userid integer references user.id,
    orderdate date,
    allcost float,
    allbooks INTEGER
);

create table order_items(
	orderid integer references orders.orderid,
    bookid integer references books.bookid,
    price_each float,
    num integer,
    id integer PRIMARY key AUTO_INCREMENT
);

select * from books;
