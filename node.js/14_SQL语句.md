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



## DDL

### 数据库的操作

```sql
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

```sql
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

