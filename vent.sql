SET NAMES utf8mb4;

DROP DATABASE IF EXISTS vent;
CREATE DATABASE vent;
USE vent;

CREATE TABLE event (
    event_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    image VARCHAR(30),
    event_name VARCHAR(50) NOT NULL,
    event_desc VARCHAR(100) DEFAULT NULL,
    event_place VARCHAR(50) DEFAULT NULL,
    event_date DATETIME,
    PRIMARY KEY (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user (
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(256) NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32),
    privilege SMALLINT UNSIGNED NOT NULL,
    password VARCHAR(255),
    profile_picture VARCHAR(30),
    PRIMARY KEY (user_id)
);

CREATE TABLE response (
    response_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    event_id SMALLINT UNSIGNED NOT NULL,
    user_id SMALLINT UNSIGNED NOT NULL,
    response BOOLEAN,
    PRIMARY KEY (response_id),
    CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES event(event_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(user_id)
);

INSERT INTO event VALUES
(1, 'happywdc.png', 'WDC Project Milestone 1 Due Date', 'You will die', 'MyUni', '2006-02-15 04:34:33'),
(2, 'happywdc.png', 'WDC Project Final Due Date', 'You are dead.', 'The Graveyard', '2006-02-15 04:34:33'),
(3, 'exampleeventphoto.png', 'Birthday Party', 'I will be born', 'My House (Location Undisclosed)', '2006-02-15 04:34:33'),
(4, 'happywdc.png', 'ying stoke', 'oh yeah yooh yeah 21389325098473254', 'cps', '2006-02-15 04:34:33');
COMMIT;
