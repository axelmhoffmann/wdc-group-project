SET NAMES utf8mb4;

DROP schema IF EXISTS vent;
CREATE DATABASE vent;
USE vent;

-- Events table
CREATE TABLE event (
    event_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    image VARCHAR(30),
    event_name VARCHAR(50) NOT NULL,
    event_desc VARCHAR(100) DEFAULT NULL,
    event_place VARCHAR(50) DEFAULT NULL,
    event_date DATETIME,
    PRIMARY KEY (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO event VALUES
(1, 'happywdc.png', 'WDC Project Milestone 1 Due Date', 'You will die', 'MyUni', '2006-02-15 04:34:33'),
(2, 'exampleeventphoto.png', 'Birthday Party', 'I will be born', 'My House (Location Undisclosed)', '2006-02-15 04:34:33'),
(3, 'happywdc.png', 'ying stoke', 'oh yeah yooh yeah 21389325098473254', 'cps', '2006-02-15 04:34:33');
COMMIT;
