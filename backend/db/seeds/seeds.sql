INSERT INTO users (name, email, password, phone_number , score)
VALUES ('John', 'john@gmail.com', 'test', 1234567, 100),
('Mark', 'mark@gmail.com', 'test1', 1234568, 200),
('Jake', 'jake@gmail.com', 'test2', 1234569, -100);


INSERT INTO products (name, expiration_date, user_id, quantity_grams, quantity_units)
VALUES ('potato', '2021-08-01', 1, 0, 15),
('cheese', '2021-06-01', 1, 2, 0 ),
('grapes', '2021-06-01', 1, 14, 0),
('milk', '2021-04-01', 1, 30, 0),
('cucumber', '2021-05-22', 1, 0, 5),
('butter', '2021-05-29', 1, 14 , 0),
('strawberries', '2021-05-25', 3 , 0 , 15);


INSERT INTO saved_recipes (recipie_name, user_id, recipe_id ,imageSRC)
VALUES ('CRISPY BUTTERMILK FRIED CHICKEN',1, 640803,'https://spoonacular.com/recipeImages/640803-556x370.jpg'),
('EASY CHICKEN POT PIE',1, 641901,'https://spoonacular.com/recipeImages/641901-556x370.jpg'),
('DETOX ORANGE CARROT JUICE',1, 641443,'https://spoonacular.com/recipeImages/641443-556x370.jpg'),
('Pizza',2, 4 , ''),
('Soup',3, 5, '');


INSERT INTO product_summary ( name, user_id, product_id, grams_wasted, units_wasted, grams_saved, units_saved)
VALUES ('potato',1, 1, 0, 0, 0, 15),
('cheese',1, 2, 3,  0, 15, 0),
('grapes',1,3, 5, 0, 20, 0),
('milk', 1, 4, 0, 0, 12,0),
('cucumber',1, 5, 0, 0, 0,10),
('butter', 1,6, 3,0,9 ,0)