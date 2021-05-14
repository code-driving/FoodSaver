INSERT INTO users (name, email, password, phone_number , score)
VALUES ('John', 'john@gmail.com', 'test', 1234567, 100),
('Mark', 'mark@gmail.com', 'test1', 1234568, 200),
('Jake', 'jake@gmail.com', 'test2', 1234569, -100);


INSERT INTO products (name, expiration_date, user_id, quantity_grams, quantity_units)
VALUES ('potato', '2021-08-01', 1, 0, 15),
('cheese', '2021-06-01', 1, 2, 0 ),
('grapes', '2021-06-01', 1, 14, 0),
('milk', '2021-09-01', 2, 30, 0),
('cucumber', '2021-05-27', 2, 0, 5),
('butter', '2021-05-29', 3, 14 , 0),
('strawberries', '2021-05-25', 3 , 0 , 15);


INSERT INTO saved_recipes (recipie_name, user_id, recipe_id ,imageSRC)
VALUES ('CRISPY BUTTERMIL FRIED CHICKEN',1, 640803,'https://spoonacular.com/recipeImages/640803-556x370.jpg'),
('EASY CHICKEN POT PIE',1, 641901,'https://spoonacular.com/recipeImages/641901-556x370.jpg'),
('DETOX ORANGE CARROT JUICE',1, 641443,'https://spoonacular.com/recipeImages/641443-556x370.jpg'),
('Pizza',2, 4 , ''),
('Soup',3, 5, '');


INSERT INTO product_summary ( user_id, product_id, grams_wasted, units_wasted, grams_saved, units_saved)
VALUES (1,1, 5, 7, 3, 5),
(1,2, 3,  6, 4, 6),
(2,3, 4, 4, 9, 7);