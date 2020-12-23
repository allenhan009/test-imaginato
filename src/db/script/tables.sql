CREATE DATABASE test_imaginato;

USE test_imaginato;

CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- INSERT INTO `articles` VALUES ('1', '', '', '');
-- INSERT INTO `articles` VALUES ('2', '', '', '');
-- INSERT INTO `articles` VALUES ('3', '', '', '');

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `creation_date` datetime NOT NULL,
  `article_id` int(11) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- INSERT INTO `comments` VALUES ('1', '', '', '');
-- INSERT INTO `comments` VALUES ('2', '', '', '');
-- INSERT INTO `comments` VALUES ('3', '', '', '');