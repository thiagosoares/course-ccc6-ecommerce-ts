
CREATE SCHEMA store AUTHORIZATION ecommerce;

CREATE TABLE store.items (
     id serial NOT NULL,
     description varchar(200) NOT NULL,
     price float4 NOT NULL
);


INSERT INTO store.items (description, price) VALUES('Helmet', 159.99);
INSERT INTO store.items (description, price) VALUES('Gloves', 113.99);
INSERT INTO store.items (description, price) VALUES('Boots', 1500);
