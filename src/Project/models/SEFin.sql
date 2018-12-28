-- 導出 sefin 的資料庫結構
CREATE DATABASE IF NOT EXISTS `sefin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `sefin`;

-- 導出  表 sefin.account 結構
CREATE TABLE IF NOT EXISTS `account` (
  `id`          text      NOT     NULL,
  `account`     text      NOT     NULL,
  `password`    text      NOT     NULL,
  `name`        text      NOT     NULL,
  `department`  text      DEFAULT NULL,
  `class`       text      DEFAULT NULL,
  `birthday`    date      DEFAULT NULL,
  `sex`         binary(1) DEFAULT NULL,
  `ID_card`     text      DEFAULT NULL,
  `address`     text      DEFAULT NULL,
  `photo`       text      DEFAULT NULL,
  `passport`    text      DEFAULT NULL,
  `credit_card` text      DEFAULT NULL,
  `cvc`         int(11)   DEFAULT NULL,
  `expire_date` date      DEFAULT NULL,
  `NTUST_coin`  int(11)   DEFAULT NULL,
  `interst`     text      DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.ad 結構
CREATE TABLE IF NOT EXISTS `ad` (
  `id`      text      NOT     NULL,
  `context` text    DEFAULT NULL,
  `author`  int(11) NOT     NULL,
  `image`   text    DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.ad_pos 結構
CREATE TABLE IF NOT EXISTS `ad_pos` (
  `id`       text    NOT     NULL,
  `position` int(11) NOT     NULL,
  `ad`       int(11) DEFAULT NULL,
  `price`    int(11) NOT     NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.article 結構
CREATE TABLE IF NOT EXISTS `article` (
  `id`       text     NOT     NULL,
  `title`    text     NOT     NULL,
  `context`  text     NOT     NULL,
  `author`   int(11)  NOT     NULL,
  `time`     datetime NOT     NULL,
  `ip`       text     NOT     NULL,
  `board_id` int(11)  DEFAULT NULL,
  `visible`  int(11)  DEFAULT NULL,
  `image`    text     DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.comment 結構
CREATE TABLE IF NOT EXISTS `comment` (
  `id`         text     NOT NULL,
  `article_id` int(11)  NOT NULL,
  `author`     int(11)  NOT NULL,
  `context`    text     NOT NULL,
  `time`       datetime NOT NULL,
  `ip`         text     NOT NULL,
  `types`      int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.gamble 結構
CREATE TABLE IF NOT EXISTS `gamble` (
  `id`       text          NOT NULL,
  `author`   int(11)       NOT NULL,
  `context`  text          NOT NULL,
  `option_1` decimal(18,0) NOT NULL,
  `option_2` decimal(18,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.gamble_member 結構
CREATE TABLE IF NOT EXISTS `gamble_member` (
  `id`      text    NOT NULL,
  `gamble`  int(11) NOT NULL,
  `account` int(11) NOT NULL,
  `option`  int(11) NOT NULL,
  `money`   int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.gp_member 結構
CREATE TABLE IF NOT EXISTS `gp_member` (
  `id`       text    NOT NULL,
  `account`  int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 資料導出被取消選擇。
-- 導出  表 sefin.groups 結構
CREATE TABLE IF NOT EXISTS `groups` (
  `id`     text    NOT NULL,
  `name`   text    NOT NULL,
  `leader` int(11) NOT NULL,
  `type`   text    NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
