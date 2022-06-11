-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: vent
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `event`
--


DROP TABLE IF EXISTS `event`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `event` (
  `event_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(30) DEFAULT NULL,
  `event_name` varchar(50) NOT NULL,
  `event_desc` varchar(100) DEFAULT NULL,
  `event_place` varchar(50) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `event`
--


LOCK TABLES `event` WRITE;

/*!40000 ALTER TABLE `event` DISABLE KEYS */;

INSERT INTO `event` VALUES
(1,'happywdc.png','WDC Project Milestone 1 Due Date','You will die','MyUni','2006-02-15 04:34:33'),
(2,'exampleeventphoto.png','Birthday Party','I will be born','My House (Location Undisclosed)','2006-02-15 04:34:33'),
(3,'happywdc.png','ying stoke','oh yeah yooh yeah 21389325098473254','cps','2006-02-15 04:34:33'),
(4,'placeholder.jpg','srnt','srntsrntsrntsrnt','srnt','2022-06-12 19:53:00'),
(5,'placeholder.jpg','s\'); drop table vent; ','kkk','srntrt','2022-06-06 15:56:00');

/*!40000 ALTER TABLE `event` ENABLE KEYS */;

UNLOCK TABLES;


--
-- Table structure for table `user`
--


DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `privilege` smallint(5) unsigned NOT NULL DEFAULT 0,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_picture` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `user`
--


LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(6,'test@user',NULL,NULL,0,'$2b$10$PhLI9WAUK14ko2bI9UhZCujUv5WUg72J9YytRmprokEh8psr0HiRK',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-08 17:45:13









