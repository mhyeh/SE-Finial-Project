-- 導出 sefin 的資料庫結構
CREATE DATABASE IF NOT EXISTS `sefin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `sefin`;

-- 導出  表 sefin.account 結構
CREATE TABLE IF NOT EXISTS `account` (
  `id`          varchar(36) NOT     NULL,
  `account`     text        NOT     NULL,
  `password`    text        NOT     NULL,
  `name`        text        NOT     NULL,
  `department`  text        DEFAULT NULL,
  `class`       text        DEFAULT NULL,
  `birthday`    date        DEFAULT NULL,
  `sex`         binary(1)   DEFAULT NULL,
  `ID_card`     text        DEFAULT NULL,
  `address`     text        DEFAULT NULL,
  `photo`       text        DEFAULT NULL,
  `passport`    text        DEFAULT NULL,
  `credit_card` text        DEFAULT NULL,
  `cvc`         int(11)     DEFAULT NULL,
  `expire_date` date        DEFAULT NULL,
  `NTUST_coin`  int(11)     DEFAULT NULL,
  `interst`     text        DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.ad 結構
CREATE TABLE IF NOT EXISTS `ad` (
  `id`      varchar(36) NOT     NULL,
  `context` text        DEFAULT NULL,
  `author`  varchar(36) NOT     NULL,
  `image`   text        DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.ad_pos 結構
CREATE TABLE IF NOT EXISTS `ad_pos` (
  `id`       varchar(36) NOT     NULL,
  `position` int(11)     NOT     NULL,
  `ad`       varchar(36) DEFAULT NULL,
  `price`    int(11)     NOT     NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.article 結構
CREATE TABLE IF NOT EXISTS `article` (
  `id`       varchar(36) NOT     NULL,
  `title`    text        NOT     NULL,
  `context`  text        NOT     NULL,
  `author`   varchar(36) NOT     NULL,
  `time`     datetime    NOT     NULL,
  `ip`       text        NOT     NULL,
  `board_id` varchar(36) DEFAULT NULL,
  `visible`  int(11)     DEFAULT NULL,
  `image`    text        DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.comment 結構
CREATE TABLE IF NOT EXISTS `comment` (
  `id`         varchar(36) NOT NULL,
  `article_id` varchar(36) NOT NULL,
  `author`     varchar(36) NOT NULL,
  `context`    text        NOT NULL,
  `time`       datetime    NOT NULL,
  `ip`         text        NOT NULL,
  `types`      int(11)     DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.gamble 結構
CREATE TABLE IF NOT EXISTS `gamble` (
  `id`       varchar(36)   NOT NULL,
  `author`   varchar(36)   NOT NULL,
  `context`  text          NOT NULL,
  `option_1` decimal(18,0) NOT NULL,
  `option_2` decimal(18,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.gamble_member 結構
CREATE TABLE IF NOT EXISTS `gamble_member` (
  `id`      varchar(36) NOT NULL,
  `gamble`  varchar(36) NOT NULL,
  `account` varchar(36) NOT NULL,
  `option`  int(11)     NOT NULL,
  `money`   int(11)     NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.gp_member 結構
CREATE TABLE IF NOT EXISTS `gp_member` (
  `id`       varchar(36) NOT NULL,
  `account`  varchar(36) NOT NULL,
  `group_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 資料導出被取消選擇。
-- 導出  表 sefin.groups 結構
CREATE TABLE IF NOT EXISTS `groups` (
  `id`     varchar(36) NOT NULL,
  `name`   text        NOT NULL,
  `leader` varchar(36) NOT NULL,
  `type`   text        NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `friends` (
  `id`        varchar(36) NOT NULL,
  `account1`  varchar(36) NOT NULL,
  `account2`  varchar(36) NOT NULL,
  `isConfirm` int(1)      NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;