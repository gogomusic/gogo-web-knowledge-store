# MySQL

## 学习进度

https://www.bilibili.com/video/BV1Kr4y1i7ru

![](assets/image.png)

- [x] [基础篇](#基础篇) ★★
- [ ] [进阶篇](#进阶篇) ★★★
	- [ ] 学到了 [03. 进阶-存储引擎-简介_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Kr4y1i7ru?spm_id_from=333.788.videopod.episodes&vd_source=ad8e06478fc114ff9485f641eabc0b4c&p=60)
- [ ] 运维 ★★★★

## 安装

### 安装到 Windows

下载：[MySQL :: Download MySQL Installer](https://dev.mysql.com/downloads/installer/)

选择需要的版本后，点击下载进入下载页面，点击下图链接直接下载

![](assets/Pasted%20image%2020240903171652.png)

## 基础篇

### MySQL 概述

![](assets/image%201.png)

![](assets/image%202.png)

### SQL

#### SQL 通用语法

![](assets/image%204.png)

#### SQL 分类

![](assets/image%205.png)

##### DDL (数据定义语言)

![](assets/image%206.png)

![](assets/image%207.png)

 ![](assets/image%208.png)

###### 数据类型

可参考:  https://www.runoob.com/mysql/mysql-data-types.html

![](assets/image%209.png)

![](assets/image%2010.png)

![](assets/image%2011.png)

###### 表操作 - 添加、修改、删除

![](assets/image%2013.png)

![](assets/image%2014.png)

![](assets/image%2015.png)

![](assets/image%2017.png)

##### DML (数据操作语言）

![](assets/image%2018.png)

![](assets/image%2019.png)

**添加时，自增字段可以用 `NULL` 代替**

![](assets/image%2020.png)

![](assets/image%2021.png)

**未指定条件，则会删除整张表的所有数据**

##### DQL (数据查询语言)

![](assets/image%2023.png)

![](assets/image%2024.png)

![](assets/image%2025.png)![](assets/image%2026.png)

![](assets/image%2027.png)![](assets/image%2028.png)

![](assets/image%2029.png)![](assets/image%2030.png)

###### DQL 的执行顺序

![](assets/image%2031.png)

##### DCL (数据控制语言)

![](assets/image%2032.png)![](assets/image%2033.png)

### 函数

![](assets/image%2034.png)

![](assets/image%2035.png)![](assets/image%2036.png)

![](assets/image%2037.png)

### 约束

![](assets/image%2038.png)

![](assets/image%2039.png)

![](assets/image%2040.png)

### 多表查询

#### 多表关系

![](assets/image%2041.png)

![](assets/image%2043.png)

![](assets/image%2046.png)

![](assets/image%2048.png)

#### 多表查询概述

`SELECT * FROM user,dept WHERE user.dept_id = dept.id;`

![](assets/image%2049.png)

![](assets/image%2050.png)

#### 内连接

![](assets/image%2051.png)

示例：

```sql
# 隐式内连接
SELECT u.name 姓名,d.name 部门 FROM user u,dept d WHERE u.dept_id = d.id;

# 显式内连接
SELECT u.name 姓名,d.name 部门 FROM user u INNER JOIN dept d ON u.dept_id = d.id;
```

> 建议使用**显式内连接**

#### 外连接

![](assets/image%2052.png)

> **常用左外连接**（右外连接可以改写为左外）

#### 自连接

![](assets/image%2053.png)

#### 联合查询

![](assets/image%2055.png)

#### 子查询

![](assets/image%2056.png)

![](assets/image%2057.png)

示例：![](assets/image%2058.png)

![](assets/image%2059.png)

列子查询示例（ALL）：![](assets/image%2060.png)

列子查询示例 (SOME/ANY):![](assets/image%2062.png)

![](assets/image%2063.png)

行子查询示例：![](assets/image%2064.png)

表子查询示例：![](assets/image%2065.png)

![](assets/image%2066.png)

### 事务

![](assets/image%2067.png)

![](assets/image%2073.png)

#### 事务操作

##### 方式 1

>  `SELECT @@autocommit;` 查询当前会话的事务提交方式，`1` 为自动提交，设置为 `0` 为手动提交（仅在当前会话生效）

- 开启事务
```sql
SELECT @@autocommit;
SET @@autocommit = 0;
```

- 提交事务
```sql
COMMIT;
```

- 回滚事务
```sql
ROLLBACK;
```

##### 方式 2

- 开启事务
```sql
START TRANSACTION;
-- 或 
BEGIN;
```

- 提交事务
```sql
COMMIT;
```

- 回滚事务
```sql
ROLLBACK;
```

#### 事务四大特性 ACID

![](assets/image%2068.png)

#### 并发事务问题

![](assets/image%2069.png)

#### 事务隔离级别

![](assets/image%2070.png)

**<font color="#ff0000">注意：事务隔离级别越高，数据越安全，但是性能越低</font>**

## 进阶篇

### MySQL 体系结构

![](assets/image%2074.png)

![](assets/image%2075.png)

#### 存储引擎

存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式。存储引擎是基于表的，而不是基于库的，所以存储引擎也可被称为表类型。
