---
tags: ['Vulgarization', 'Web', 'Pentest', 'SQL', 'Injection']
description: "Delve into the Dark Depths of SQL Injection: When Data Becomes Weapons"
translation: { "fr": "sqli_pour_les_nuls", "en": "sqli_for_dummies"}
---

# SQLi for dummies

I imagine that you've already heard about the many **data leaks carried out by malicious actors**. Sometimes, several vulnerabilities are used to obtain and extract the coveted data, but sometimes, a simple injection allows access to the entire database.

## Introduction

Today, we're tackling a relatively well-known vulnerability, perhaps one of the best-known on the Web: **SQL injection**. So before we talk about SQL injection, we need to understand the SQL language and web architectures. Let's go

### What's SQL 

::hint{type="info"}
**SQL stands for structured query language, and is a programming language for interacting with relational databases. It enables data to be stored, manipulated and retrieved in a structured way.**

Relational databases comprise a set of tables, which are used to store data.
::

For example, for my blog website, I have my database which includes a "blog" table storing posts and a "comments" table, storing - I think you've guessed it - comments.

| ![blog_sql_table_ex](../../images/SQLi/blog_sql_table_ex.gif) |
| :-----------------------------------------------------------: |
|               *SQL Database and table example*                |
 <br>

Storing data is cool, but consulting it is even better, so there's the **SELECT** query in SQL to retrieve information. For example, `SELECT * FROM users` (so here, we want everything from the users table).

| ![select_all](../../images/SQLi/basicselect.png) | ![select_all_result](../../images/SQLi/selectallresult.png) |
| :----------------------------------------------: | :---------------------------------------------------------: |
|               *Select all request*               |                  *Result from select all*                   |

To refine SELECT, you can add a clause, logical operators and aggregation functions : 

* Firstly, the `WHERE` clause in a select, which simply allows you to add specific conditions.

| ![select_where_age](../../images/SQLi/whererequest.png) | ![result_select_where_age](../../images/SQLi/whereresult.png) |
| :-----------------------------------------------------: | :-----------------------------------------------------------: |
|                   *Select with where*                   |                  *Result from select where*                   |

* Logical operators are used to combine conditions.

| ![select_multiple_conditions](../../images/SQLi/requestmultipleconditions.png) | ![result_select_multiple_conditions](../../images/SQLi/multipleconditions.png) |
| :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|                        *Select with mutiple conditions*                        |                  *Result from select with mutiple conditions*                  |

* Aggregation functions, such as `SUM`, `AVG` or `COUNT`, simply calculate values from table data.

* There's also the `UNION` operator, which will be important later, used to combine the results of two separate SELECT queries into a single result list.

| ![union_request](../../images/SQLi/union_sql.png) | ![union_result](../../images/SQLi/UNION_RESULT.png) |
| :-----------------------------------------------: | :-------------------------------------------------: |
|              *SQL query with union*               |            *Result from union SQL query*            |
  
* Finally, you should know that there are other instructions besides `SELECT`, such as `INSERT`, which inserts new data into a table, `UPDATE`, which updates existing data, and `DELETE`, which deletes data.

### Web architectures

Now that you've got the hang of it, let's take a quick look at web architectures. 

Most web sites are working with a database on a third-party server called **BACKEND**. There are several types of architecture, such as :
* 2-tier
* 3-tier (with a back and a front end)
* microservices 
* service-oriented architecture (SOA).

Just remember that in all these architectures, the website **sends requests to the database in order to exchange information**, for example, to retrieve all the comments on a news page.

Now that the groundwork has been laid, let's get down to the nitty-gritty: **SQL injection** !

## What is a SQL Injection ?

::hint{type="info"}
**SQL injection (SQLi) is a Web security vulnerability that allows an attacker to interfere with an application's queries to its database.** 
::

This usually allows an attacker to display data that he would not normally be able to retrieve. This can include data belonging to other users, or any other data that the application itself can access. 

In many cases, **an attacker can modify or delete this data**, causing persistent changes to the application's content or behavior.

How does this work, you may ask? Here's a little lab to help you understand !

<details>
<summary class="summary">Basic SQLi Auth bypass</summary>

**Click to see the basic SQLi Auth bypass (with english subtitle)**.

[![Minia_DOM_XSS](../../images/sqli/minia_sqli.png)](https://youtu.be/KWOs0Waq2TM?si=Lt-vOesJ57Eo6HEk&t=269)

</details>

## Union Based SQL Injection 

It's good to have basic SQL injection, but there's a problem: how do you retrieve data from other tables? Normally, this would ring a bell in your head.

Well, you can with the UNION operator. Union based SQL Injection allows an attacker to retrieve data from other tables.

How does it work?
