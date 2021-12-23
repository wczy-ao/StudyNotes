# mysql基础

## 数据库类型

数据库划分成两类：关系型数据库和非关系型数据库

关系型数据库：

- `MySQL、Oracle、DB2、SQL Server、Postgre SQL`
- 关系型数据库通常我们会创建很多个**二维数据表**
- 数据表之间相互关联起来，形成一对一、一对多、多对对等关系
- 之后可以利用SQL语句在多张表中查询我们所需的数据
- 支持事务，对数据的访问更加的安全；

非关系型数据库：

- `MongoDB、Redis、Memcached、HBse`
- 非关系型数据库的英文其实是**Not only SQ**L，也简称为NoSQL；
- 相当而已非关系型数据库比较简单一些，存储数据也会更加自由（甚至我们可以直接将一个复杂的json对象直接塞入到数据库中）；
- NoSQL是基于Key-Value的对应关系，并且查询的过程中不需要经过SQL解析，所以**性能更高**；



## mysql历史

MySQL原本是一个开源的数据库，原开发者为瑞典的MySQL AB公司；

在2008年被Sun公司收购；在2009年，Sun被Oracle收购；所以目前MySQL归属于Oracle；



MySQL是一个关系型数据库，其实本质上就是一款软件、一个程序：

- **程序中管理着多个数据库**
- **数据库中可以有多张表；**
- **数据库中可以有多张表；**



## mysql的安装与启动

### 安装

1. Windows推荐下载MSI的版本；
2. 选择sever only，然后一直next
3. 配置环境变量和系统变量---> `C:\Program Files\MySQL\MySQL Server 8.0\bin`
4. 终端执行：`mysql --version`

### 启动

- 方式1：终端连接 `mysql -uroot -p`

- 方式2：navicat连接 