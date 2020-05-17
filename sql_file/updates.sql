-- add/remove columns
ALTER TABLE orders DROP COLUMN deadline;
ALTER TABLE orders ADD COLUMN pickup_date TIMESTAMP NULL;
ALTER TABLE orders ADD COLUMN date_ordered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP();
ALTER TABLE orders ADD COLUMN payment_option VARCHAR(50) NULL;

-- remove non nullability of columns
ALTER TABLE orders MODIFY COLUMN email VARCHAR(50) NULL;
ALTER TABLE orders MODIFY COLUMN facebook VARCHAR(50) NULL;
ALTER TABLE orders MODIFY COLUMN instagram VARCHAR(50) NULL;
ALTER TABLE orders MODIFY COLUMN pickup_location VARCHAR(50) NULL;
ALTER TABLE orders MODIFY COLUMN delivery_address VARCHAR(250) NULL;
ALTER TABLE orders MODIFY COLUMN delivery_method VARCHAR(50) NULL;
ALTER TABLE orders MODIFY COLUMN request VARCHAR(250) NULL;
ALTER TABLE orders MODIFY COLUMN special_offer VARCHAR(250) NULL;
ALTER TABLE orders MODIFY COLUMN discount FLOAT NULL;

-- single discount field to discount type and amount
ALTER TABLE orders CHANGE discount discount_amount FLOAT NULL;
ALTER TABLE orders ADD COLUMN discount_type tinyint(1) NULL;

------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------
