CREATE DATABASE  IF NOT EXISTS `semestersync_local` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `semestersync_local`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: semestersync_local
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '42453e72-3841-11f1-9316-0a0027000013:1-136';

--
-- Table structure for table `schedule_shares`
--

DROP TABLE IF EXISTS `schedule_shares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_shares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scheduleId` varchar(45) NOT NULL,
  `token` varchar(64) NOT NULL,
  `permission` varchar(10) NOT NULL DEFAULT 'view',
  `expiration` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `schedule_shares_token_unique` (`token`),
  KEY `schedule_shares_schedule_id_idx` (`scheduleId`),
  CONSTRAINT `schedule_shares_schedule_id_fk` FOREIGN KEY (`scheduleId`) REFERENCES `schedules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_shares`
--

LOCK TABLES `schedule_shares` WRITE;
/*!40000 ALTER TABLE `schedule_shares` DISABLE KEYS */;
INSERT INTO `schedule_shares` VALUES (1,'08344b24-b2e4-4d8f-80f2-7651002e7faa','61bcd321e020fb4f7e505417222648d86d7d1ed0132fa5ab962f06ffa5bcc6ad','view','2026-09-22 20:14:00','2026-09-22 19:14:00'),(2,'08344b24-b2e4-4d8f-80f2-7651002e7faa','368a5a29c9a63b56944332962c10401c4f3fdc2b758c9657255b5599cdece9b5','view','2026-09-22 21:13:03','2026-09-22 20:13:03'),(3,'ddcd1a8e-9d7a-474c-b9cb-15246a772716','f5b33cdf907578472ae26d2ec34162d82582ae344975d4b67996a001e45ad208','view','2026-09-22 21:29:40','2026-09-22 20:29:40'),(4,'ddcd1a8e-9d7a-474c-b9cb-15246a772716','272067f6b5143f6bd98d6c533ec65483a8f7bf95e93949e883242f02f55ab378','view','2026-09-22 21:29:40','2026-09-22 20:29:40'),(5,'ddcd1a8e-9d7a-474c-b9cb-15246a772716','45eb06a71fe0d555ffdc10f87499f4d8b1d96192e2f801dc783d8d48ba91a3f2','view','2026-09-22 21:29:52','2026-09-22 20:29:52');
/*!40000 ALTER TABLE `schedule_shares` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-23 23:25:10
