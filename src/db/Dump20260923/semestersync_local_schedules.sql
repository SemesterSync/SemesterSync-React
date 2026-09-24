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
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `events` json NOT NULL,
  `totalCredits` int NOT NULL DEFAULT '0',
  `selectedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES ('08344b24-b2e4-4d8f-80f2-7651002e7faa','dthgfhgfh','[{\"kind\": \"linked-course\", \"color\": \"#181687\", \"eventId\": \"46cb5d66-a003-43b1-8be6-74b680de0939\", \"courseId\": 1140, \"termCode\": \"1214\", \"sectionId\": 1154, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#42f556\", \"eventId\": \"6690982a-dbe6-4a09-b5ee-29f067227e88\", \"courseId\": 1127, \"termCode\": \"1214\", \"sectionId\": 1129, \"staticCourseCredits\": 3.5}, {\"kind\": \"linked-course\", \"color\": \"#f54265\", \"eventId\": \"b7d2adca-2347-4747-8aaa-b074a460763b\", \"courseId\": 1118, \"termCode\": \"1214\", \"sectionId\": 1118, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#f542f1\", \"eventId\": \"3054065d-0f1d-4607-9996-34c129fcdb7b\", \"courseId\": 1158, \"termCode\": \"1214\", \"sectionId\": 1158, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#eff542\", \"eventId\": \"1b38dba1-a557-4e1a-ace6-d50af58ed648\", \"courseId\": 1089, \"termCode\": \"1214\", \"sectionId\": 1117, \"staticCourseCredits\": 3}, {\"kind\": \"personal\", \"color\": \"#871663\", \"title\": \"Workout\", \"endDate\": \"2026-10-13T04:00:00.000Z\", \"eventId\": \"b51789cd-0cc1-408a-8cb9-299cb6eeb808\", \"meetings\": [{\"day\": \"Monday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}, {\"day\": \"Tuesday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}, {\"day\": \"Wednesday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}, {\"day\": \"Thursday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}, {\"day\": \"Friday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}, {\"day\": \"Saturday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}, {\"day\": \"Sunday\", \"endTime\": \"2026-08-14T00:00:00.000Z\", \"location\": \"\", \"startTime\": \"2026-08-13T21:00:00.000Z\"}], \"startDate\": \"2026-08-13T04:00:00.000Z\", \"description\": \"\"}]',16,'2026-08-26 04:00:00'),('ddcd1a8e-9d7a-474c-b9cb-15246a772716','Schedule 1','[{\"kind\": \"linked-course\", \"color\": \"#42f581\", \"eventId\": \"7928c253-e10c-4674-9cd0-59c0a8294a64\", \"courseId\": 1136, \"termCode\": \"1214\", \"sectionId\": 1136, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#0af6f8\", \"eventId\": \"a63f8fb7-5ba3-468d-b53d-7fa82592cdf5\", \"courseId\": 1133, \"termCode\": \"1214\", \"sectionId\": 1160, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#edb10f\", \"eventId\": \"75b9158c-8137-489f-b3ef-6b14e8625db7\", \"courseId\": 152, \"termCode\": \"1214\", \"sectionId\": 1023, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#bd42f5\", \"eventId\": \"4475c1a0-3241-4ab4-8df5-b20232bbfef5\", \"courseId\": 1103, \"termCode\": \"1214\", \"sectionId\": 1103, \"staticCourseCredits\": 3}, {\"kind\": \"linked-course\", \"color\": \"#4285F4\", \"eventId\": \"7ce9092b-8124-4b73-a3af-9b07c7489627\", \"courseId\": 996, \"termCode\": \"1214\", \"sectionId\": 997, \"staticCourseCredits\": 3}]',15,'2026-09-22 04:00:00');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
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

-- Dump completed on 2026-09-23 23:25:11
