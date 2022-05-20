-- Drop the database if it already exists
DROP DATABASE IF EXISTS TestingSystem;
-- Create database
CREATE DATABASE IF NOT EXISTS TestingSystem;
USE TestingSystem;
ALTER DATABASE TestingSystem CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Create table user
DROP TABLE IF EXISTS 	`User`;
CREATE TABLE IF NOT EXISTS `User` ( 	
	`id`			SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`username`	 	CHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`username`) >= 6 AND LENGTH(`username`) <= 50),
	`email` 		CHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
	`password` 		VARCHAR(800) NOT NULL,
    `firstName` 	NVARCHAR(50) NOT NULL,
	`lastName` 		NVARCHAR(50) NOT NULL,
    `phone`         CHAR(10) NOT NULL UNIQUE,
    `address`       NVARCHAR(50) NOT NULL,
    `role` 			ENUM('Admin','Employee','Leader','Stocker') DEFAULT 'Employee',
	`status`		Tinyint  DEFAULT 0, -- 0: Not Active, 1: Active
    `avatarUrl`		VARCHAR(500)
);

-- Create table Registration_User_Token
DROP TABLE IF EXISTS 	`Registration_User_Token`;
CREATE TABLE IF NOT EXISTS `Registration_User_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- Create table Reset_Password_Token
DROP TABLE IF EXISTS 	`Reset_Password_Token`;
CREATE TABLE IF NOT EXISTS `Reset_Password_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- create table: Department 
DROP TABLE IF EXISTS `Department`;
CREATE TABLE `Department`(
	id int UNSIGNED AUTO_INCREMENT,
    KEY(`id`),
	`DepartmentID`   NVARCHAR(100) NOT NULL UNIQUE KEY PRIMARY KEY,
    `description`	NVARCHAR(1000) NOT NULL ,
    `DepartmentName` NVARCHAR(100) NOT NULL UNIQUE KEY,
    `Manager`		NVARCHAR(50) Default "No Manager",
    `status`		ENUM('Sẵn sàng' , 'Chưa sẵn sàng') DEFAULT 'Sẵn sàng'
);
-- create table: Employee 
DROP TABLE IF EXISTS `Staff`;
CREATE TABLE `Staff`(
id int UNSIGNED AUTO_INCREMENT,
    KEY(`id`),
	`staffId`   	NVARCHAR(100) NOT NULL UNIQUE KEY PRIMARY KEY,
    `fullName`		NVARCHAR(50) NOT NULL UNIQUE KEY,
    `phone` 			VARCHAR(11) UNIQUE KEY,
	`email` 		VARCHAR(50) UNIQUE KEY,
    `DepartmentID`   NVARCHAR(100) DEFAULT "WAITING",
    FOREIGN KEY (`DepartmentID`) REFERENCES `Department` (`departmentId`) ON UPDATE CASCADE ON DELETE SET NULL,
    `role`			ENUM('Employee', 'Leader','Admin') Default 'Employee'
);
-- DROP TABLE IF EXISTS `StaffOfDepartment`;
-- CREATE TABLE `StaffOfDepartment`(
-- 	`id` 			INT UNSIGNED AUTO_INCREMENT ,
--     KEY(`id`),
-- 	`staffId`   	NVARCHAR(100),
-- 	`DepartmentID`  NVARCHAR(100),	
-- 	Primary key ( `staffId` ,`DepartmentID` ),
--     FOREIGN KEY (`DepartmentID`) REFERENCES `Staff`(`DepartmentID`)  ,
-- 	FOREIGN KEY (`staffId`) REFERENCES `Staff`(`staffId`) 
-- );
 -- create table: equipment
DROP TABLE IF EXISTS `Equipment`;
CREATE TABLE `Equipment`(
	`id` 						INT UNSIGNED AUTO_INCREMENT ,
    KEY(`id`),
	`EquipmentID`				NVARCHAR(30) NOT NULL UNIQUE KEY PRIMARY KEY,
    `EquipmentName` 			NVARCHAR(100) NOT NULL UNIQUE KEY,
	`staffName`  					NVARCHAR(100) DEFAULT 'No Staff',
    `classify`               	VARCHAR(10) NOT NULL,
	`description`    			NVARCHAR(500) NOT NULL ,
    `status`			    ENUM('BROKEN','REPAIR','USING', 'READY') NOT NULL DEFAULT 'READY',
    `brand`					NVARCHAR(190) NOT NULL ,
	`insurance`				NVarchar(15) NOT NULL
);
DROP TABLE IF EXISTS `MessageByStaff`;
CREATE TABLE `MessageByStaff` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    KEY (`id`),
    `sender` NVARCHAR(50),
    `Message` NVARCHAR(500)
    
);
DROP TABLE IF EXISTS `EquipOfDepart`;
CREATE TABLE `EquipOfDepart` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    KEY (`id`),
    `EquipmentID`				NVARCHAR(30) ,
    `EquipmentName` 			NVARCHAR(100) ,
	`staffName`  					NVARCHAR(100) DEFAULT 'No Staff',
    `classify`               	VARCHAR(10) NOT NULL,
	`description`    			NVARCHAR(500) NOT NULL ,
    `status`			    ENUM('BROKEN','REPAIR','USING', 'READY') NOT NULL DEFAULT 'READY',
    `brand`					NVARCHAR(190) NOT NULL ,
	`insurance`				NVarchar(15) NOT NULL,
    `unitPrice`	NVarchar(15) NOT NULL,
    `quantity` INT UNSIGNed NOT null,
    `DepartmentID` NVARCHAR(100),
    FOREIGN KEY (`DepartmentID`) REFERENCES `Department` (`departmentId`) ON UPDATE CASCADE ON DELETE SET NULL
   );
DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    KEY (`id`),
    `EquipmentID` NVARCHAR(30) NOT NULL UNIQUE KEY PRIMARY KEY,
    `EquipmentName` NVARCHAR(50) NOT NULL ,
    `staffName` NVARCHAR(100) DEFAULT 'No Staff',
    `classify` VARCHAR(10) NOT NULL,
    `description` NVARCHAR(500) NOT NULL,
    `brand` NVARCHAR(190) NOT NULL,
    `unitPrice`	NVarchar(15) NOT NULL,
    `quantity` INT UNSIGNed NOT null,
    `insurance` NVARCHAR(15)
);

-- passworyd: 123456
INSERT INTO `User` 	(`username`,			`email`,						`password`,														`firstName`,		`lastName`,      `phone`  , `address`,          `status`, 	`role`,  		`avatarUrl`				    )
VALUE				('hanh.havan@vti',		'hanhhanoi1999@gmail.com',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Hà'	,		'Văn Hanh',		'0976234298',	     'Thanh Hóa' ,    0, 		'Leader' 	,		null				), 
					('thanhhung12@vti',		'hung122112@gmail.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thanh Hưng',	'0977290298',	     'Tuyên Quang' ,    0, 		'Stocker' 	,		null				), 
					('can.tuananh@vti',		'cananh.tuan12@vti.com',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Cấn'	,		'Tuấn Anh',		'0978290298',		'Lào Cai'	,	 0, 		'Leader' 	,		null				), 
					('toananh123@vti',		'toananh123@vti.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Anh Toàn',		'0978390298',		'Hà Nội'	,	 0, 		'Stocker'	,		null				), 
					('manhhung123@vti',		'manhhung123@vti.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Mạnh Hùng',	'0925290298',	     'Thanh Hóa' ,	 0, 		'Leader' 	,		null				),
					('maianhvti123',		'maianhng@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Mai Anh',		'0972902961',		'Thanh Hóa'	,	 0, 		'Employee'	,		null				),
					('tuanvti12344',		'tuan1234@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Văn Tuấn',		'0975290258',		'Nam Định'	,	 0, 		'Stocker'	,		null				),
					('ngthuy123',			'thuyhanoi@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thị Thủy',		'0975290248',		'Phú Thọ'	,	 0, 		'Employee'	,		null				),
					('quanganhvti',			'quanganh@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Quang Anh',	'0975290398',		'Hà Nội'	,	 0, 		'Leader' 	,		null				),
					('hoanghungvti',	    'hunghoang@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Vũ'	,		'Hoàng Hưng',	'0975290298',	     'Hà Nội' ,    0, 			'Employee'	,		null				),
					('quocanhvti',			'quocanh12@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Quốc Anh',		'0975291298',	     'Thanh Hóa' ,    0, 		'Employee'	,	    null				),
					('vananhvti',			'vananhb1@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Vân Anh',		'0975295298',	     'Hà Nội' ,    0, 			'Stocker'	,		null				),
					('mailanvti',			'mailan123@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thị Trinh',	'0975590298',		'Bắc Ninh'	,	 0, 		'Leader' 	,		null				),
					('tuanhungvti',			'tuanhung@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Vũ'	,		'Tuấn Hưng',	'0975290278',		'Bắc Giang'	,	 0, 		'Employee'	,		null				),
					('xuanmaivti',			'xuanmai12@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Xuân Mai',		'0975290288',		'Ninh Bình'	,	 0, 		'Employee'	,		null				),
                    ('duynn03',				'duynn03@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Duy',			'0975290292',		'Thanh Hóa'	,	 1, 		'Employee'	,		'123456.png'	     ),
                    ('minhduc9999',			'nvva0907@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Hoàng',	' Minh Đức',			'0975290296',		'Hà Nội'	,	 1, 		'Admin'	    ,		'123456.png'         ),
                    ('vietanh9720',			'thuonghoang09032000@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',	'Nguyễn ',		'Việt Anh',		'0914917488',		'Hà Nội'	,	 1, 		'Leader'	,		null	             );
					
       --  UPDATE `testingsystem`.`user` SET `role` = 'Admin' WHERE (`username` = 'minhduc9999');            
-- Add data Department
INSERT INTO `Department`( `DepartmentID`, `DepartmentName`, `Manager`,`description`,  `status` ) 
VALUES
						('D1', N'Phòng Vật tư y tế'         ,'Hoàng Minh Đức'         , 'Tẩng 3 Nhà D1'	,'Sẵn sàng' ),
						('D2', N'Khoa Thận nhân tạo '	    , 	'Nguyễn Văn Thương	' ,	'Tầng 4 Nhà C1'	,'Chưa sẵn sàng'),
						('D3', N'Khoa Chăm sóc hồi phục'    , 		'Nguyễn Văn Tương',	'Tầng 1 Nhà A1'	,'Sẵn sàng' ),
						('D4', N'Khoa Dược '		        , 	'Nguyễn Văn Quốc	' ,	'Tầng 1 Nhà B1'	,'Sẵn sàng' ),
						('D5', N'Khoa Ngoại tổng hợp'	    , 	'Nguyễn Văn Tuấn	',	'Tầng 2 Nhà B1'	,'Sẵn sàng' ),
						('D6', N'Khoa Phẫu thuật - gây mê hồi sức', 'Hoàng Minh Đức',	'Tầng 3 Nhà C3'	,'Sẵn sàng' ),
						('D7', N'Khoa Y học hạt nhân'       , 	'Hoàng Minh Đức'	,	'Tầng 1 Nhà D3'	,'Chưa sẵn sàng' ),
						('D8', N'Khoa Xạ trị'	     		, 	'Nguyễn Văn Thương	',	'Tầng 2 Nhà D3'	,'Sẵn sàng' ),
						('D9', N'Khoa Răng-Hàm-Mặt' 	    , 'Nguyễn Văn Tương	'	,	'Tầng 3 Nhà A3'	,'Sẵn sàng' ),
						('D10', N'Khoa Xét nghiệm tổng hợp' ,' Nguyễn Văn Quốc	',		'Tầng 2 Nhà A2'	,'Sẵn sàng'),
                        ('D11', N'Khoa Phụ sản'			    , 	'Nguyễn Văn Tuấn',		'Tầng 2 Nhà D1'	,'Sẵn sàng' ),
                        ('D12', N'Khoa Nhi'				    , 'Hoàng Minh Đức', 		'Tầng 1 Nhà D1'	,'Sẵn sàng'),
                        ('D13', N'Khoa Truyền nhiễm'		, 'Hoàng Minh Đức', 		'Tầng 4 Nhà C3'	,'Sẵn sàng' ),
                        ('D14', N'Khoa Cấp cứu'			    , 'Hoàng Minh Đức', 		'Tầng 2 Nhà A3'	,'Sẵn sàng' ),
					    ('D15', N'Khoa Lọc máu '			, 'Hoàng Minh Đức', 		'Tầng 1 Nhà C1'	,'Sẵn sàng' ),
						('D16', N'Khoa Tai-Mũi-Họng '		, 	'Hoàng Minh Đức',		'Tầng 2 Nhà C1'	,'Sẵn sàng' ),
						('D17', N'Khoa Y học cổ truyền'	    , 'Hoàng Minh Đức', 		'Tầng 3 Nhà C1'	,'Sẵn sàng' ),
						('D18', N'Khoa Dinh dưỡng'		    , 'Hoàng Minh Đức', 		'Tầng 4 Nhà D2'	,'Sẵn sàng' ),
                        ('WAITING', N'Phòng chờ'		    ,'Hoàng Minh Đức', 			'Dành cho nhân viên chưa được phân bố phòng ban'	,'Sẵn sàng' ),
                        ('X0', N'Phòng giám đốc quản lý'     , 'Hoàng Minh Đức', 		'Giám đốc quản lý'	,'Sẵn sàng' );

						
INSERT INTO `Staff` (`staffId`,`fullName`,`phone`, `email`,`DepartmentId`,`role`) 
VALUES       			('E1', 'Nguyễn Văn Việt Anh','0782323465','nvva0908@gmail.com','D1','Employee'),
						('M1', 'Nguyễn Văn Tuấn','0132523343','nvva0923@gmail.com','D1','Leader'),
                        ('E2', 'Nguyễn Văn Quang','07823234585','nvva0911@gmail.com','D2','Employee'),
						('M2', 'Nguyễn Văn Quốc','0132523523','nvva0909@gmail.com','D2','Leader'),
						('A1', 'Hoàng Minh Đức','0782323185','nvva0907@gmail.com','X0','Admin'),
                        ('E3', 'Nguyễn Văn Việt ','0783423465','nvva092352@gmail.com','D3','Employee'),
						('M3', 'Nguyễn Văn Tương','0132578343','nvva092q34352@gmail.com','D3','Leader'),
                        ('E4', 'Nguyễn Văn Hải','07643234585','nvva0925@gmail.com','D4','Employee'),
						('M4', 'Nguyễn Văn Thương','0132523893','nvva09235@gmail.com','D4','Leader');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D1' WHERE (`staffId` = 'E1');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D1' WHERE (`staffId` = 'M1');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D2' WHERE (`staffId` = 'E2');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D2' WHERE (`staffId` = 'M2');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'X0' WHERE (`staffId` = 'A1');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D3' WHERE (`staffId` = 'E3');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D3' WHERE (`staffId` = 'M3');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D4' WHERE (`staffId` = 'E4');
-- UPDATE `testingsystem`.`staff` SET `DepartmentID` = 'D4' WHERE (`staffId` = 'M4');

                        
INSERT INTO `Inventory` (`EquipmentID` , `EquipmentName` ,`staffName` ,`classify` ,`description` , `brand` ,`unitPrice`,`quantity`, `insurance`) 
VALUES       			('N1' , 'Giường cấp cứu hồi sức điều khiển điện' ,'Nguyễn Văn Việt Anh' ,'A' ,'Nâng hạ khẩn cấp CPR: Dành cho trường hợp như ép tim khẩn cấp. Được tích hợp cả hệ thống nâng hạ bằng điện và hệ thống nâng hạ bằng cơ' , 'Hameg' ,'260.000.000','7', '1 năm'),
						('N2' , 'Bơm truyền dịch' ,'Lê Huy Minh' ,'A' ,'Máy cung cấp chất lỏng và chất dinh dưỡng vào cơ thế' , 'Yamasu','200.000.000' ,'8', '1 năm'),
                        ('N3' , 'Đèn chiếu vàng da' ,'Nguyễn Văn Việt Anh' ,'A' ,'Đèn chiếu sáng điều trị bênh vàng da và lão hóa' , 'TimLL' ,'130.000.000','12', '1 năm'),
						('N4' , 'Đèn mổ treo trần 1 nhánh' ,'Hoàng Ánh Dương' ,'B' ,'Đèn mổ lắp trong các phòng cấp cứu công nghê cao' , 'FriendlyARM','108.000.000' ,'15', '1 năm'),
			            ('N5' , 'Robot phẫu thuật' ,'Nguyễn Văn Việt Anh' ,'B' ,'Sử dụng Ai thâm nhập vào cơ thể phẫu thuật theo điều kiển' , 'VNMachine' ,'4.500.000.000','2', '1 năm'),
						('N6' , 'Máy cắt tiêu bản' ,'Hoàng Ánh Dương' ,'A' ,'Máy đo huyết áp tự động Omron' , 'VNMachine','56.000.000' ,'13', '1 năm'),
                        ('N7' , 'Hệ thống nước R.O' ,'Lê Huy Minh' ,'B' ,'Đồng hồ đo đa năng: VOM' , 'Sanwa' ,'93.000.000','14', '1 năm'),
						('N8' , 'Máy xử lý bệnh phẩm' ,'Nguyễn Văn Việt Anh' ,'A' ,'Digital Oscillator 40MHz' , 'Tektronix','20.000.000' ,'13', '1 năm'),
                        ('N9' , 'Bàn/ Ghế/ Tủ y tế' ,'Nguyễn Văn Việt Anh' ,'A' ,'Ống nghe số' , 'VNMachine' ,'90.000.000','56', '1 năm'),
						('N10' , 'Deluxe Blood Pressure Simulator' ,'Hoàng Ánh Dương' ,'B' ,'Cánh tay giả mô phỏng tín hiệu huyết áp' , 'VNMachine','300.000.000' ,'33', '1 năm'),
                        ('N11' , 'Digital Ultrasonic Diagnostic' ,'Lê Huy Minh' ,'B' ,'Hệ thống chẩn đoán siêu âm số' , 'Mindray' ,'113.000.000','14', '1 năm'),
						('N12' , 'ECG Simulator' ,'Nguyễn Văn Việt Anh' ,'A' ,' Thiết bị mô phỏng điện tim' , 'BIOPAC','20.000.000' ,'11', '1 năm'),
                        ('N13' , 'Mặt nạ phòng độc' ,'Lê Huy Minh' ,'C' ,'Bảo hộ các bác sĩ khỏi vi khuẩn' , 'VNMachine','8.000.000' ,'100', '1 năm'),
                        ('N14' , 'Tủ bảo quản' ,'Nguyễn Văn Việt Anh' ,'C' ,'Bảo quản các thiết bị y tế' , 'VNMachine' ,'2.000.000','200', '1 năm'),
						('N15' , 'Áo phẩu thuật' ,'Lê Huy Minh' ,'C' ,'Bảo hộ các bác sĩ khỏi vi khuẩn' , 'VNMachine','45.000.000' ,'600', '1 năm'),
                        ('N16' , 'Tủ đồ' ,'Nguyễn Văn Việt Anh' ,'C' ,'Bảo quản các thiết bị y tế' , 'VNMachine' ,'4.000.000','2400', '1 năm'),
						('N17' , 'Pulse Oximeter Avant 9700' ,'Hoàng Ánh Dương' ,'A' ,' Máy đo SPO2 có hiển thị dạng sóng PPG' , 'Nonin Medical','24.000.000' ,'40', '1 năm');
                        
  INSERT INTO  `Equipment` (`EquipmentID`,`EquipmentName`,`classify`,`description`,`status`,`brand`,`insurance`)	 
 VALUE 						('E1' , 'Máy phát hàm 10MHZ Function Generator', 'A', 'Tạo các tín hiệu: sin, vuông, tam giác với tần số lớn nhất', 'Ready', 'Hameg','2 năm '),
							('E2' , 'Máy đo huyết áp cơ', 'B', 'Thiết bị sẽ tạo ra một áp lực lớn hơn áp suất tâm thu dự kiến, ngăn chặn sự chuyển động của dòng máu', 'Ready', 'agilent','1 năm '),
							('E3' , 'Xe lăn điện', 'B', 'Xe lăn điện nhập khẩu, xe lăn điện 4 bánh điều khiển bằng tay', 'Ready', 'thiglabs','3 năm '),
							('E4' , 'Thiết bị mô phỏng độ bão hòa oxy', 'A', 'Mô phỏng tín hiệu SPO2 từ 50%-100%', 'Ready', 'mindray','1 năm '),
							('E5' , 'Máy phá rung tim đồng bộ', 'B', 'Thiết bị mô phỏng tín hiệu điện của bệnh nhân từ đó giúp hỗ trợ điều trị tim', 'Ready', 'CIRS','2 năm '),
							('E6' , 'Máy chạy thận KCS', 'B', 'Máy chạy thận', 'Ready', 'Fluke','1 năm '),
							('E7' , 'Máy phân tích đông máu', 'A', 'Máy phân tích đông máu', 'Ready', 'Fluke','1 năm '),
							('E8' , 'Máy phân tích nước tiểu', 'B', 'Máy phân tích nước tiểu', 'Ready', 'AMONI','2 năm '),
							('E9' , 'Máy X-quang EVA HF -750 plus', 'A', 'Máy X-quang EVA HF -750 plus', 'Ready', 'Yamasu','1 năm '),
							('E10' , 'Máy đo khúc xạ mắt', 'C', 'Máy đo khúc xạ mắt', 'Ready', 'Raytek','4 năm '),
							('E11' , 'Găng tay phẫu thuật', 'C', 'Găng tay phẫu thuật', 'Ready', 'Raytek','1 năm '),
							('E12' , 'Thermometer', 'A', 'Máy đo nhiệt độ bằng laser', 'Ready', 'Fluke','1 năm '),
							('E13' , 'Multimeter Simpson', 'C', 'Đồng hồ Analog đa năng hiển thị bằng kim', 'Ready', 'Simpson','1 năm '),
							('E14' , 'Bơm insulin', 'A', 'Mô phỏng tín hiệu SPO2 từ 50%-100%', 'Ready', 'Fluke','1 năm '),
							('E15' , 'Máy hô hấp ký Spirometer Easy on PC', 'B', 'Máy hô hấp ký', 'Ready', 'BIOPAC','2 năm '),
							('E16' , 'ECG Simulator', 'B', 'Thiết bị mô phỏng điện tim', 'Ready', 'Müller & Sebastia','1 năm '),
							('E17' , 'Simulator Fluke MPS450', 'B', 'Thiết bị mô phỏng tín hiệu bệnh nhân Fluke MPS450', 'Ready', 'CIRS','2 năm '),
							('E18' , 'Máy đo Oxy não vùng', 'B', 'Máy đo nồng độ ô oxy trong các tế bào não bằng công nghệ sóng âm', 'Ready', 'Fluke','1 năm '),
							('E19' , 'Máy thở xâm nhập và không xâm nhập người lớn', 'A', 'Thiết bị Phương thức thở bằng máy mà trong suốt chu kỳ hô hấp ', 'Ready', 'Fluke','3 năm '),
							('E20' , 'Máy X quang tổng quát', 'B', 'Thiết bị sử dụng phổ biến trong chẩn đoán hình ảnh, phương pháp tạo ảnh là sử dụng tia X (tia roentgen) ', 'Ready', 'AMONI','1 năm '),
							('E21' , 'Máy thở Bi-PAP, CPAP', 'A', 'Thiết bị Hỗ trị quá trình thở khi bệnh nhân bị hụt hơi ', 'Ready', 'Yamasu','1 năm '),
							('E22' , 'Máy xét nghiệm sinh hóa có ISE', 'C', 'Thiết bị cho đầu ra xét nghiệm nhanh gấp đôi xét nghiệm Covid-19', 'Ready', 'Raytek','2 năm '),
							('E23' , 'Máy siêu âm trị liệu', 'C', 'Thiết bị Sử dụng công nghệ trường phát sóng xoáy giúp điều trị hiệu quả hơn', 'Ready', 'Raytek','1 năm '),
							('E24' , 'Thiết bị tập phục hồi chức năng', 'A', ' Thiết bị Bao gồm nhiều loại thiết bị khác nhau hỗ trợ cho quá trình tập luyện hồi phục của bệnh nhân', 'Ready', 'Fluke','1 năm '),
							('E25' , 'Máy xét nghiệm sinh hóa tự động', 'C', 'Thiết bị Phân tích quang phổ được điều khiển bằng bộ vi xử lý', 'Ready', 'Simpson','3 năm '),
							('E26' , 'Máy tán sỏi tiết niệu', 'A', ' Thiết bị Điều trị bệnh gián tiếp nên bên cạnh ưu điểm ít xâm hại, ít đau thì hiệu quả hết sỏi chỉ đạt từ 55 – 85% ', 'Ready', 'Fluke','1 năm '),
							('E27' , 'Máy siêu âm chẩn đoán Doppler màu', 'B', 'Thiết bị chẩn đoán hình ảnh bất cứ dòng chảy nào bên trong cơ thể dựa vào hiệu ứng Doppler', 'Ready', 'BIOPAC','5 năm '),
							('E28' , 'Bộ dụng cụ phẫu thuật', 'B', 'Thiết bị hỗ trợ các bác sĩ phẩu thuât', 'Ready', 'Katena Product','1 năm ');
 UPDATE `testingsystem`.`equipment` SET `staffName` = 'Hoàng Minh Đức' WHERE (`EquipmentID` = 'E1');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Quang' WHERE (`EquipmentID` = 'E10');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Việt ' WHERE (`EquipmentID` = 'E11');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Hải' WHERE (`EquipmentID` = 'E2');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Tuấn' WHERE (`EquipmentID` = 'E3');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Quốc' WHERE (`EquipmentID` = 'E4');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Tương' WHERE (`EquipmentID` = 'E5');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Thương' WHERE (`EquipmentID` = 'E6');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Hải' WHERE (`EquipmentID` = 'E7');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Việt ' WHERE (`EquipmentID` = 'E8');
UPDATE `testingsystem`.`equipment` SET `staffName` = 'Nguyễn Văn Tuấn' WHERE (`EquipmentID` = 'E9');

 
-- INSERT INTO EquipmenDepartmentIDt  (EquipmentName,		  EquipmentNameID		,	Quantily,						 Manufacturer	,														DateOfUse  ,		DescriptionEquipment ,     ReleaseDate   ,      `status`			)
-- VALUE				FOREIGN KEY ('Máy siêu âm 4D Hitachi Futus',		'hanhhanoi1999@gmail.com',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Hà'	,		'Văn Hanh',		'0976234298',	     'Thanh Hóa' ,    0, 		'Manager' 	,		null				), 
-- 					('M`email` 	áy cấy máu tự động BDBACTEC',		'hung122112@gmail.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thanh Hưng',	'0977290298',	     'Tuyên Quang' ,    0, 		'Stocker' 	,		null				), 
-- 					('Máy định danh vi khuẩn',		'cananh.tuan12@vti.com',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Cấn'	,		'Tuấn Anh',		'0978290298',		'Lào Cai'	,	 0, 		'Manager' 	,		null				), 
-- 					('Xe lăn điện',		'toananh123@vti.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Anh Toàn',		'0978390298',		'Hà Nội'	,	 0, 		'Stocker'	,		null				), 
-- 					('Bơm insulin',		'manhhung123@vti.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Mạnh Hùng',	'0925290298',	     'Thanh Hóa' ,	 0, 		'Manager' 	,		null				),
-- 					('Bình oxy cố định',		'maianhng@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Mai Anh',		'0972902961',		'Thanh Hóa'	,	 0, 		'Employee'	,		null				),
-- 					('Máy thở oxy',		'tuan1234@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Văn Tuấn',		'0975290258',		'Nam Định'	,	 0, 		'Stocker'	,		null				),
-- 					('Máy chạy thận',			'thuyhanoi@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thị Thủy',		'0975290248',		'Phú Thọ'	,	 0, 		'Employee'	,		null				),
-- 					('Máy phân tích đông máu',			'quanganh@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Quang Anh',	'0975290398',		'Hà Nội'	,	 0, 		'Manager' 	,		null				),
-- 					('Bộ đếm vi sai',	    'hunghoang@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Vũ'	,		'Hoàng Hưng',	'0975290298',	     'Hà Nội' ,    0, 		'Employee'	,		null				),
-- 					('Máy phân tích nước tiểu',			'quocanh12@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Quốc Anh',		'0975291298',	     'Thanh Hóa' ,    0, 		'Admin'	  	,		null				),
-- 					('Máy X-quang EVA HF -750 plus',			'vananhb1@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Vân Anh',		'0975295298',	     'Hà Nội' ,    0, 		'Stocker'	,		null				),
-- 					('Máy đo khúc xạ mắt',			'mailan123@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thị Trinh',	'0975590298',		'Bắc Ninh'	,	 0, 		'Manager' 	,		null				),
-- 					('Tủ bảo quản',			'tuanhung@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Vũ'	,		'Tuấn Hưng',	'0975290278',		'Bắc Giang'	,	 0, 		'Employee'	,		null				),
-- 					(' Phim X-Quang',			'xuanmai12@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Xuân Mai',		'0975290288',		'Ninh Bình'	,	 0, 		'Employee'	,		null				),
--                     ('Tấm cảm biến nhận ảnh X quang y tế',				'duynn03@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Duy',			'0975290292',		'Thanh Hóa'	,	 1, 		'Employee'	,		'123456.png'	     ),
--                     ('Găng tay phẫu thuật',			'vananhb1@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Vân Anh',		'0975295298',	     'Hà Nội' ,    0, 		'Stocker'	,		null				),
-- 					(' Áo phẩu thuật',			'mailan123@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thị Trinh',	'0975590298',		'Bắc Ninh'	,	 0, 		'Manager' 	,		null				),

DROP TRIGGER IF EXISTS before_department_update;
DELIMITER $$
 CREATE TRIGGER before_department_update
 BEFORE DELETE ON department
 FOR EACH ROW
BEGIN
 Delete from equipofdepart where DepartmentId = OLD.DepartmentId;
END$$
 DELIMITER ;
 
--  DROP TRIGGER IF EXISTS after_equipmentOfDp_insert;
-- DELIMITER $$
--  CREATE TRIGGER before_department_update
--  After Insert ON equipofdepart
--  FOR EACH ROW
-- BEGIN
--  INSERT INTO  `Equipment` (`EquipmentID`,`EquipmentName`,`classify`,`description`,`status`,`brand`,`insurance`)	 
--  VALUE 	(OLD.EquipmentID , OLD.EquipmentName, OLD.classify, OLD.description, OLD.`status`, OLD.`brand`,OLD.`insurance`);
-- END$$
--  DELIMITER ;