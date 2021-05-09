INSERT INTO users (name, email, password, phone_number , score)
VALUES ('John', 'john@gmail.com', 'test', 1234567, 100),
('Mark', 'mark@gmail.com', 'test1', 1234568, 200),
('Jake', 'jake@gmail.com', 'test2', 1234569, -100);


INSERT INTO products (name, expiration_date, user_id, quantity_grams, quantity_units)
VALUES ('potato', '2021-08-01', 1, 10, 15),
('cheese', '2021-06-01', 1, 2, 0 ),
('grapes', '2021-06-01', 1, 14, 0),
('milk', '2021-09-01', 2, 30, 0),
('cucumber', '2021-05-27', 2, 0, 5),
('butter', '2021-05-29', 3, 14 , 0),
('strawberries', '2021-05-25', 3 , 0 , 15);


INSERT INTO saved_recipes (recipie_name, user_id, recipe_id)
VALUES ('Pasta',1, 1),
('Fries',1, 2),
('Chicken',2, 3),
('Pizza',2, 4),
('Soup',3, 5);


INSERT INTO quantities (product_id, grams_wasted, units_wasted, grams_saved, units_saved)
VALUES (1, 5, 7, 3, 5),
(2, 3,  6, 4, 6),
(3, 4, 4, 9, 7);