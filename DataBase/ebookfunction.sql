delimiter //
create function exist_user(name varchar(255)) returns integer
begin
	declare ct integer;
    select count(*) into ct from user where accountname = name;
	return ct;
end//
delimiter ;