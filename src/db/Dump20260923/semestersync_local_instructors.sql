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
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `instructor_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`instructor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (1,'Kavanagh, Kimberly'),(2,'Mix, Cheressa'),(3,'Sedor, Melissa'),(4,'Dorman, Heather'),(5,'Buck, Nicole'),(6,'Porter, Michael'),(7,'Holland, Jacob'),(8,'Bell, Matthew'),(9,'Wolfe, Cody'),(10,'Cotner, David'),(11,'Schelb, Michael'),(12,'Kopera, Steven'),(13,'Joy, Anthony'),(14,'Nolan, Matthew'),(15,'Brown, Jason'),(16,'Frontz, Tyler'),(17,'Good, Ryan'),(18,'Rhinehart, Ty'),(19,'Colton, James'),(20,'Biddle, Aaron'),(21,'Hurd, Mark'),(22,'Garner, Ronald'),(23,'Fedor, Christopher'),(24,'Harrison, Dakota'),(25,'Smith, Thomas'),(26,'Krepps, Matthew'),(27,'Hampton, Stacey'),(28,'Probst, Charles'),(29,'Bogarin Cantero, Barbara'),(30,'McDonald, Ryan'),(31,'Farr-Lepper, Amanda'),(32,'Reber, Franklin'),(33,'Meck, Allan'),(34,'Dincher, James'),(35,'Morgan, Amber'),(36,'Account, Test'),(37,'LeBlanc, Joseph'),(38,'Hensler Jansen, Laura'),(39,'Miller BAS, Craig'),(40,'Beury, Kaysey'),(41,'Rodriguez, Duncan'),(42,'Morrison, Ann'),(43,'Kline, Tina Marie'),(44,'Saka, Tuna'),(45,'Dailey, Elizabeth'),(46,'Martin, Jeremy'),(47,'Tice, David'),(48,'Semanoff, Peter'),(49,'Killinger, Jason'),(50,'Dibucci, Joseph'),(51,'Lambert, Lisa'),(52,'Kulpon, Mary'),(53,'Keeley, Todd'),(54,'Williamson, Randy'),(55,'Williamson, Matthew'),(56,'Myers, Shelley'),(57,'Yoas, Daniel'),(58,'Suchwala, Francis'),(59,'Snyder-Everitt, Sheryl'),(60,'Tilburg, Christine'),(61,'Wrench, Barry'),(62,'Arrigonie, John'),(63,'Schiele, Tara'),(64,'Etzweiler, Jessica'),(65,'Thompson, Nicholas'),(66,'Cao, Qiang'),(67,'Hicks, Jill'),(68,'Robison, Michael'),(69,'Miller, Emily'),(70,'Holley, Christopher'),(71,'Anderson, Kathryn'),(72,'Kaplan, Gerald'),(73,'Wilson, Mark'),(74,'Stephenson, Nicholas'),(75,'Yoder, Joanna'),(76,'Anstadt, Eric'),(77,'Counterman, Arthur'),(78,'Weaver, Samantha'),(79,'Rankinen, Jeffrey'),(80,'Nolan, Robert'),(81,'Moser, Randall'),(82,'Goode, Erika'),(83,'Hyland, Sherry'),(84,'Eck, Katelyn'),(85,'Furman, Melissa'),(86,'Sneidman, Mark'),(87,'Bukeavich, Summer'),(88,'Cowperthwait, Nicole'),(89,'Miller, Natalie'),(90,'Davner, Aliza'),(91,'Stubbs, Lisa'),(92,'Myers, Valerie'),(93,'Campbell, Andrea'),(94,'Crossen, John'),(95,'Miller, Adam'),(96,'Boone, George'),(97,'Stetter, Robin'),(98,'Group, Brandon'),(99,'Marconnet, Alex'),(100,'Lingafelt, Felicia'),(101,'Rice, Vii'),(102,'Barilla, Adam'),(103,'Perez, Jose'),(104,'Schwanger, Tiffany'),(105,'Win, Rivka'),(106,'Sheppard, Wayne'),(107,'Vistarakula, Krishna'),(108,'Schlosser, William'),(109,'Bjorkman, David'),(110,'Winder, Elizabeth'),(111,'Diehl, Emily'),(112,'Llewellyn, Alexa'),(113,'Downard, Jimmy'),(114,'Felix, Ashlee'),(115,'Pruden, Eric'),(116,'Klinger, Roy'),(117,'Hack, Shaun'),(118,'Brooks, Daniel'),(119,'McCracken, Cody'),(120,'Welshans, Seth'),(121,'Bruckhart, Loren'),(122,'Beaver, Chet'),(123,'Jabbour, Naim'),(124,'Lorson, Alison'),(125,'Bilger, Daniel'),(126,'Young, Harrison'),(127,'Paterno, David'),(128,'Showan, David'),(129,'Vlacich, Robert'),(130,'Christopher, Daniel'),(131,'Tavani, Joseph'),(132,'Eckenrod, Christine'),(133,'Smith, Allen'),(134,'Dostick, Lisa'),(135,'Reed, Lauren'),(136,'Johnson, Kristina'),(137,'Covone, Michael'),(138,'Evans, Tina'),(139,'Saxe, Mary Jo'),(140,'Miller, Ethan'),(141,'Keyser, Korey'),(142,'Damiani, D Michael'),(143,'Reasner, Brett'),(144,'Januchowski, Jeffrey'),(145,'Seroskie, Scott'),(146,'Trapani, Christopher'),(147,'Faryniak, John'),(148,'Copp, Jacob'),(149,'Bidlespacher, Kelly'),(150,'Minnick, Tiana'),(151,'Motel, Bridget'),(152,'Clossen, Tammy'),(153,'Baker, Pamela'),(154,'Lovestrand, Donnamarie'),(155,'Hicks, Amanda'),(156,'Durand, Patricia'),(157,'Williamson, Sasha'),(158,'Hyatt, Kathleen'),(159,'Folmar, Sadie'),(160,'Thomas, Elena'),(161,'Habalar, Tushanna'),(162,'Stone, Teresa'),(163,'Murafka, Dawn'),(164,'Harris, Daniel'),(165,'Fanella, Amanda'),(166,'Foust, Adrianna'),(167,'Kishbaugh, Bradley'),(168,'Breon, Autumn'),(169,'Welker, Kenneth'),(170,'Swain, Nathan'),(171,'Bridgens, Marc'),(172,'Legarski, Elizabeth'),(173,'Rhone, Rebecca'),(174,'Sofopoulos, Steven'),(175,'Hampton, Daniel'),(176,'Koser, Tara'),(177,'Lindsay, Jeanine'),(178,'Faust, Margaret'),(179,'Brelsford, Kindra'),(180,'Avery, Karen'),(181,'Ingram, Justin'),(182,'Miller, Tammy'),(183,'Allar, Michael'),(184,'Manbeck, Stephen'),(185,'Kule, Chris'),(186,'McClintock, Caitlin'),(187,'Watkins, Pat'),(188,'Yarrington, Timothy'),(189,'Jones, Robert'),(190,'Francis, Matthew'),(191,'Tamblin, John'),(192,'Banks, Mary'),(193,'Butzler, Kelly'),(194,'Ciavarella, Veronica'),(195,'Hurst, Travis'),(196,'Keebaugh, Christof'),(197,'Herr, Ronald'),(198,'Richards, David'),(199,'Deming, Matt'),(200,'Cooley, Rob'),(201,'Jones, Clifford'),(202,'Graff, Garret'),(203,'Jennings, Darin'),(204,'Mowrey, Earl'),(205,'Rainey, Katherine'),(206,'Kahn, Bernard'),(207,'Bierly, Scott'),(208,'Moyer, David'),(209,'Kruppenbacher, Peter'),(210,'Kendall, Todd'),(211,'Hintz, Harry'),(212,'Zimmerman, Craig'),(213,'Johle, Amy'),(214,'Ott, Ronald'),(215,'Niedermyer, Charles'),(216,'Bartron, Dustin'),(217,'Easton, Eric'),(218,'Dincher, Michael'),(219,'Fisher, Andrew'),(220,'Avery, Nathan'),(221,'Newcomer, Eric'),(222,'Daneker, David'),(223,'Gerring, Dorothy'),(224,'Komarnicki, Anthony'),(225,'Demmien, Kara'),(226,'Hart, Jon'),(227,'Yokitis, Kevin'),(228,'Krick, Jason'),(229,'Coakley, Lukes'),(230,'Morse, Darrin'),(231,'Stefanowicz, Keith'),(232,'Seasholtz, Craig'),(233,'Miller, Craig'),(234,'Krawiec, Catherine'),(235,'Fagnano, Vincent'),(236,'Tomassacci, Kendra'),(237,'Schreck, Shane'),(238,'Snyder, Kevin'),(239,'Ask, Thomas'),(240,'Pace, Benjamin'),(241,'Tombasco, Mario'),(242,'Rice, Mark'),(243,'Sarge, Clark'),(244,'Kinley, Kenneth'),(245,'West, William'),(246,'Almasy, Edward'),(247,'Ruhl, Karen'),(248,'Albright, Paul'),(249,'Bower, Carl'),(250,'Shelinski, Justin'),(251,'Raup, Joseph'),(252,'Bell, Jennifer'),(253,'Lehman, Nathan'),(254,'Stellfox, Adam'),(255,'Murray, Karen'),(256,'Day, Nikole'),(257,'Leisey, Lacy'),(258,'Bleil, Robert'),(259,'Wheeler, Shanna'),(260,'Nagy, Eric'),(261,'Morris, Debra'),(262,'Budnovitch, Michele'),(263,'Webb, Melissa'),(264,'McDonald, Paige'),(265,'Ellis, Brad'),(266,'Steppe, Sherry'),(267,'Montaruli, William'),(268,'Vetock, Jeffrey'),(269,'Knaur, Keenan'),(270,'Gilchrist, Brian'),(271,'Yeager, Jennifer'),(272,'Flannery, Brandon'),(273,'Hill, Joshua'),(274,'Cheskiewicz, Stephen'),(275,'Shultz, Walter'),(276,'Buck, Jennifer'),(277,'Sones, Mark'),(278,'Henry, LeAnn'),(279,'Yoder, Kimberly'),(280,'Jacobs, Lisa'),(281,'Owens, Edwin'),(282,'McNett, Alicia'),(283,'Maize, John'),(284,'Heimbach, Allen'),(285,'Warner, Phillip'),(286,'Becker, David'),(287,'Rhodes, Lauren'),(288,'Haines, Evonne'),(289,'Mitchell, Robert'),(290,'Krepshaw, Robert'),(291,'Vander Vere, Curt'),(292,'Shahrtash, Hossein'),(293,'James, Bryan'),(294,'Trick, Nathan'),(295,'Conklin, Brad'),(296,'Bell, Jeremy'),(297,'Cordelli, Roseann'),(298,'Fry, Jeremy'),(299,'Weaver, Christopher'),(300,'Smith, Drew'),(301,'Moore, Sarah'),(302,'Wahl, Jennifer'),(303,'Bashista, Kenneth'),(304,'Peck, Ryan'),(305,'Chappo, John'),(306,'Alberti, Susan'),(307,'McKeon, Brian'),(308,'Loehr, Gustav'),(309,'Koons Slamka, Susan'),(310,'Dickey, Dawn'),(311,'Wheeler, Jeffrey'),(312,'Weinreb-Welch, Laurie'),(313,'Nace, Matthew'),(314,'Fletcher, Roy'),(315,'Lukpetris, Sylvia'),(316,'Pacenta, JoAnn'),(317,'Greenaway, Elizabeth'),(318,'Young, Joshua'),(319,'Baumgardner, Gerald'),(320,'Bergan, Nicholas'),(321,'Derr, Kevin'),(322,'Andrus, Lisa'),(323,'Ciavarella, Mark'),(324,'Fedor, David'),(325,'Nededog, Jose'),(326,'Rich, Tammy'),(327,'Yoder, Adam'),(328,'Nau, Michael'),(329,'Campbell, Richard'),(330,'Allen, Michael'),(331,'Davies, Luke'),(332,'Troup, Howard'),(333,'Brandenberger, Judith'),(334,'Birrer, Samuel'),(335,'Schaefer, Bryan'),(336,'Ravizza, Daniel'),(337,'Yorks, Jason'),(338,'Upcraft, John'),(339,'Weitzel, Levi'),(340,'Tanner, James'),(341,'Jaconetta, Andrew'),(342,'King, Andrew'),(343,'Keister, Andrew'),(344,'Lawton, Sarah'),(345,'Haden, Shanna'),(346,'Lester, Ellyn');
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
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
