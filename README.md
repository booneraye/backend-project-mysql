# BACK END PROJECT

### DATABASE SET UP
- DOWNLOAD OR INSTALL XAMMP
- Start the Xammp application and Go to http://localhost/phpmyadmin/ then GO TO SQL Tab and copy paste the query below.
-   CREATE DATABASE test_database;
    CREATE TABLE `users` ( 
      `id` INT AUTO_INCREMENT NOT NULL,
      `first_name` VARCHAR(255) NOT NULL,
      `last_name` VARCHAR(255) NOT NULL,
      `address` VARCHAR(1000) NOT NULL,
      `post_code` VARCHAR(255) NOT NULL,
      `contact_phone_number` VARCHAR(255) NOT NULL,
      `email_address` VARCHAR(255) NOT NULL,
      `username` VARCHAR(255) NOT NULL,
      `password` VARCHAR(1000) NOT NULL,
      `access_level` VARCHAR(255) NOT NULL,
      CONSTRAINT `PRIMARY` PRIMARY KEY (`id`),
      CONSTRAINT `username` UNIQUE (`username`)
    );
    
    //This part is optional you can start with no users But to start using ADD USER API Endpoint create an ADMIN user
    INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `post_code`, `contact_phone_number`, `email_address`, `username`, `password`, `access_level`) VALUES (1, 'Administrator', '1', 'Calooncan City', '1234', '0909090909', 'sample@gmail.com', 'admin1', '$2a$10$Ehwj5iIFF8oj3L0J3CGNtOdk0lg/QK7l8hUrEyGf6Qh44X2C4WJoy', 'administrator');
    INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `post_code`, `contact_phone_number`, `email_address`, `username`, `password`, `access_level`) VALUES (2, 'User', '1', 'Calooncan City', '1234', '0909090909', 'sample@gmail.com', 'user1', '$2a$10$yhV38rtxsnAQARmDpsPHEOpq4UaNcx77DDMaesDGruo6G9i7WkPnW', 'user');
    INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `post_code`, `contact_phone_number`, `email_address`, `username`, `password`, `access_level`) VALUES (3, 'User', '2', 'Calooncan City', '1234', '0909090909', 'sample@gmail.com', 'user2', '$2a$10$CWiJZtK.VP37ra7vggt83uaDDCKIqwnMvjOR.TE9OuOey6NJCGaXu', 'user');

### HOW TO RUN THE SERVER
- clone this repository
- `npm install` to install all the needed node modules then run the start script using `npm run start`
- After successfully running the server it will be avaialble at `localhost:5500`

## API ENDPONTS

#### LOGIN
- You can now access the login api by going to `localhost:5500/api/v1/sample/login`
- HTTP Method use on this is `POST`
- Prameters required are `username` and `password`
- Sample query `{ "username": "admin1", "password": "123" }`

#### VIEW ALL USERS
- You can now viewl all users api by going to `localhost:5500/api/v1/sample/users`
- HTTP Method use on this is `POST`
- Prameters required are `username`, API will check first if the username has admin priviledges
- Sample query `{ "username": "admin1" }`

#### ADD NEW USER
- You can now viewl all users api by going to `localhost:5500/api/v1/sample/add_user`
- HTTP Method use on this is `POST`
- Prameters required is `admin_username`, API will check first if the username has admin priviledges
- Parameters to add new user are `first_name`, `last_name`, `address`, `post_code`, `contact_phone_number`, `email_address`, `username`, `password`, `access_level`. `username` in this field must be unique
- Sample query `{
    "admin_username" : "admin1",
	"first_name": "User",
	"last_name": "2",
	"address": "Calooncan City",
	"post_code": "1234",
	"contact_phone_number": "0909090909",
	"email_address": "sample@gmail.com",
	"username": "user2",
	"password": "1234",
	"access_level" : "user"
}`

#### UPDATE USER
- You can now viewl all users api by going to `localhost:5500/api/v1/sample/add_user`
- HTTP Method use on this is `POST`
- Prameters required is `admin_username`, API will check first if the username has admin priviledges
- Parameters to UPDATE user data are `id`, `first_name`, `last_name`, `address`, `post_code`, `contact_phone_number`, `email_address`, `username`, `password`, `access_level`. `username` in this field must be unique
- Sample query `{
    "admin_username" : "admin1",
	"id" : "3"
    "first_name": "User",
	"last_name": "2",
	"address": "Calooncan City",
	"post_code": "1234",
	"contact_phone_number": "0909090909",
	"email_address": "sample@gmail.com",
	"username": "user2",
	"password": "1234",
	"access_level" : "user"
}`

#### DELETE USER
- You can now access the login api by going to `localhost:5500/api/v1/sample/delete_user`
- HTTP Method use on this is `POST`
- Prameters required are `admin_username`, `username` and `id`
- Sample query `{ "admin_username" : "admin1", "username": "admin1", "id": "3" }`

#### DELETE MULTIPLE USERS
- You can now access the login api by going to `localhost:5500/api/v1/sample/multiple_delete_users`
- HTTP Method use on this is `POST`
- Prameters required are `admin_username`, `users`
- `users` is an array of object that must contains user's id and username
- Sample query `{
	"users": [
		{"id":31, "username": "user1"},
		{"id":30, "username": "user2"}
	]
}`
