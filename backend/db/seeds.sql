INSERT INTO users (name, email, password, phone_number )
VALUES ('John', 'john@gmail.com', 'test', 1234567),
('Mark', 'mark@gmail.com', 'test1', 1234568),
('Jake', 'jake@gmail.com', 'test2', 1234569);


INSERT INTO products (name, expiration_date, user_id)
VALUES ('potato', '2021-08-01', 1),
('cheese', '2021-06-01', 1),
('milk', '2021-09-01', 2),
('cucumber', '2021-05-27', 2),
('butter', '2021-05-29', 3),
('strawberries', '2021-05-25', 3);


INSERT INTO saved_recipes (user_id, recipe_id)
VALUES (1, 1),
VALUES (1, 2),
VALUES (2, 3),
VALUES (2, 4),
VALUES (3, 5);


INSERT INTO quantities (product_id, quantity_grams, quantity_units, grams_wasted, units_wasted, grams_saved, units_saved)
VALUES (1, 5, 7, 10, 15, 3, 5),
VALUES (2, 3, 2, 7, 6, 4, 6),
VALUES (3, 4, 3, 8, 4, 9, 7);