DROP PROCEDURE calcForAllOrders;
DELIMITER $$
CREATE PROCEDURE calcForAllOrders() 
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE n FLOAT DEFAULT 0;
    DECLARE cur_id INT DEFAULT 0;
    DECLARE cs CURSOR FOR (
		SELECT orderid FROM orders WHERE allcost = 0
    );
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	OPEN cs;
    order_loop:
    LOOP 
		FETCH cs INTO cur_id;
        IF done THEN
			LEAVE order_loop;
		END IF;
        SELECT SUM(num * price_each) into n
				FROM order_items
				WHERE orderid= cur_id;
		UPDATE orders 
        SET allcost = n
        WHERE orderid = cur_id;
	END LOOP;
END; $$
DELIMITER ;