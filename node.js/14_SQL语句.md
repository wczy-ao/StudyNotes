# SQL语句

## SQL语句分类

- DDL（Data Definition Language）：数据定义语言； 
  - 可以通过DDL语句对数据库或者表进行：创建、删除、修改等操作；
- DML（Data Manipulation Language）：数据操作语言； 
  - 可以通过DML语句对表进行：添加、删除、修改等操作；据库的操作
- DQL（Data Query Language）：数据查询语言；
  - 可以通过DQL从数据库中查询记录；**（重点）**

- DCL（Data Control Language）：数据控制语言；
  - 对数据库、表格的权限进行相关访问控制操作；



## SQL常用的数据类型

- 数字类型

  ```
  整数：
  INTEGER，INT，SMALLINT，TINYINT，MEDIUMINT，BIGINT；
  浮点数：
  FLOAT，DOUBLE
  ```

- 日期类型

  ```
  YEAR:表示年、范围是1901-2155和0000、格式就是YYYY
  DATE:表示有日期没有时间的值、格式是YYYY-MM-DD、范围是'1000-01-01'--'9999-12-31'
  DATETIME:格式是YYYY-MM-DD hh:mm:ss'、支持的范围是'1000-01-01 00:00:00到9999-12-31 23:59:59'
  TIMESTAMP:格式是'YYYY-MM-DD hh:mm:ss'、范围是UTC的时间范围：'1970-01-01 00:00:01'到'2038-01-19 03:14:07';
  ```

- 字符串类型

  ```
  CHAR类、字符长度可以是0-255的任何值、查询的时候会删除后面的空格
  VARCHAR类、长度可以指定0-65535之间、查询的时候不会删除后面的空格
  BINARY和VARBINARY 类型用于存储二进制字符串，存储的是字节字符串；
  BLOB用于存储大的二进制类型
  TEXT用于存储大的字符串类型
  ```

  

## 表的约束

- **主键：PRIMARY KEY**

  - 每一条记录的唯一性，主键是表中唯一的索引
  - 必须是`NOT NULL`的，如果没有设置 `NOT NULL`，那么`MySQL`也会隐式的设置为`NOT NULL`

- **唯一：UNIQUE**

  - 某些字段在开发中我们希望是唯一的，不会重复的，比如手机号码、身份证号码等，这个字段我们可以使用UNIQUE来约束

  - UNIQUE 索引允许NULL包含的列具有多个值NULL

- **不能为空：NOT NULL**

  - 某些字段我们要求用户必须插入值，不可以为空，这个时候我们可以使用 NOT NULL 来约束

- **默认值：DEFAULT**

  - 某些字段我们希望在没有设置值时给予一个默认值，这个时候我们可以使用 DEFAULT来完成； 

- **自动递增：AUTO_INCREMENT**

  - 某些字段我们希望不设置值时可以进行递增，比如用户的id，这个时候可以使用AUTO_INCREMENT来完成；



## DDL

### 数据库的操作

```mysql
# 查看所有数据库
SHOW DATABASES;

# 选择某一个数据库
USE blog; 

# 查看当前正在使用的数据库
SELECT DATABASE();

# 创建一个新的数据库
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

# 删除数据库
DROP DATABASE IF EXISTS blog;

# 修改数据库编码
ALTER DATABASE blog CHARACTER SET = utf8 COLLATE =utf8_unicode_ci;
```



### 数据表的操作

```mysql
# 查看所有的表
SHOW TABLES;

# 新建表
CREATE TABLE IF NOT EXISTS teacher (
	`name` VARCHAR(10),
	`age` int,
	`subject` VARCHAR(10)
);

# 删除表
DROP TABLE IF EXISTS `teacher`;
```



## DML

```mysql
# DML

# 插入数据
INSERT into `user` VALUES (110, 'why','020-110110','2020-01-11','2020-10-29');
INSERT INTO `user` (name, telPhone, createTime, updateTime)
						VALUES ('kobe', '000-1111111', '2020-10-10', '2030-10-20');
INSERT INTO `user` (name, telPhone) VALUES ('wan', '010-1111112');

# 需求：createTime和updateTime可以自动设置值
ALTER TABLE `user` MODIFY `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `user` MODIFY `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


# 表约束
CREATE TABLE IF NOT EXISTS `pro`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) not NULL,
	age INT DEFAULT 0
);

# 删除
# 删除表中所有数据
DELETE FROM `pro`;

# 删除特定的数据
DELETE FROM `pro` WHERE id = 11;

# 更新数据
# 更新所有的数据
UPDATE `user` SET name = 'lili';

# 更新符合条件的数据
UPDATE `user` SET name = 'lily', telPhone = '010-1101133' WHERE id = 112;

```





## DQL

```mysql
# 建表
CREATE TABLE IF NOT EXISTS `products` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100) NOT NULL,
	price DOUBLE NOT NULL,
	score DECIMAL(2,1),
	voteCnt INT,
	url VARCHAR(100),
	pid INT
);

# 1：基本查询
# 查询所有字段
SELECT * FROM `products`;
# 查询指定字段
SELECT title, price FROM `products`;
# 指定别名
SELECT title as t, brand as b, price as p FROM `products`;


# 2：where 条件查询
# 查询价格小于1000的手机
SELECT * FROM `products` WHERE price < 1000;

SELECT * FROM `products` WHERE price >= 2000;

# 价格等于3399的手机
SELECT * FROM `products` WHERE price = 3399;
# 价格不等于3399的手机
SELECT * FROM `products` WHERE price != 3399;
SELECT * FROM `products` WHERE price <> 3399;

# 查询华为品牌的手机
SELECT * FROM `products` WHERE `brand` = '华为';

# 3：逻辑运算
SELECT * FROM `products` WHERE `brand` = '华为' and `price` < 2000;
SELECT * FROM `products` WHERE `brand` = '小米' and `price` > 2000;

# 查询1000到2000的手机（不包含1000和2000）
SELECT * FROM `products` WHERE price > 1000 and price < 2000;

# 查询1000到2000的手机（包含1000和2000）
SELECT * FROM `products` WHERE price BETWEEN 1000 and 2000;

# 查看多个结果中的一个
SELECT * FROM `products` WHERE brand in ('华为', '小米');
SELECT * FROM `products` WHERE brand = '华为' or brand = '小米';



# 4: 模糊查询

# 查询所有以v开头的title
SELECT * FROM `products` WHERE title LIKE 'v%';
# 查询带M的title
SELECT * FROM `products` WHERE title LIKE '%M%';
# 查询带M的title必须是第三个字符
SELECT * FROM `products` WHERE title LIKE '__M%';



# 5：排序和分页查询
SELECT * FROM `products` WHERE brand = '华为' or price < 1000 ORDER BY price ASC;

SELECT * FROM `products` LIMIT 30 OFFSET 0;
# 另外一种写法：offset, row_count
SELECT * FROM `products` LIMIT 90, 30;
```

