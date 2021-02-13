CREATE TABLE `employee` (
  `employeeId` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP ,
  `update_date` TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`employeeId`),
  UNIQUE KEY `EmployeeId_UNIQUE` (`employeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
