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

| ![select_all](../../images/SQLi/basic_select.png) | ![select_all_result](../../images/SQLi/selectallresult.png) |
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

**How does this work, you may ask? Here's a little lab to help you understand !**

<details>
<summary class="summary">Basic SQLi Auth bypass</summary>

**Click to see the basic SQLi Auth bypass (with english subtitle)**.

[![Minia_DOM_XSS](../../images/sqli/minia_sqli.png)](https://youtu.be/KWOs0Waq2TM?si=Lt-vOesJ57Eo6HEk&t=269)

</details>

## Union Based SQL Injection 

It's good to have basic SQL injection, but there's a problem: **how do you retrieve data from other tables?**

Well, you can with the `UNION` operator. **Union based SQL Injection allows an attacker to retrieve data from other tables.**

**How does it work?**

To make a UNION query work, **two essential conditions must be met**:

1. **The individual queries must return the same number of columns.**

| ![SQL_UNION_OKAY_1](../../images/SQLi/union_okay_1.png) | ![SQL_UNION_NOTOKAY_1](../../images/SQLi/en_union_not_okay.png) |
| :-----------------------------------------------: | :-------------------------------------------------: |
|              *SQL union query okay*               |            *SQL union query not okay (because different number of columns)*            |

2. **The data types of each column must be compatible across the individual queries, meaning no mixing of integers with strings.**

| ![SQL_UNION_OKAY_2](../../images/SQLi/SQL_UNION_OKAY_1.png) | ![SQL_UNION_NOTOKAY_2](../../images/SQLi/en_union_not_okay_2.png) |
| :-----------------------------------------------: | :-------------------------------------------------: |
|               *SQL union query okay*              |             *SQL union query not okay (because different data types between Age and Nom)*            |

In order to successfully conduct a Union-Based SQL injection (SQLi), you need to determine:

1. **How many columns are returned by the original query ?**
    * Using an error-based methodology, we submit a list of UNION SELECT statements :

| ![UNION_NUMBER_OF_COLUMNS](../../images/sqli/UNION_NUMBER_OF_COLUMNS.gif) | 
|:--:| 
| *Finding the right number of columns for UNION BASED SQLi* |

2. **Which columns returned by the original query are of an appropriate data type to hold the results of the injected query ?** 
    * To do this, we will test each column one by one as follows :

| ![UNION_TYPE_OF_COLUMNS](../../images/sqli/UNION_find_columns_containing_text.gif) | 
|:--:| 
| *Finding the right column's datatype for UNION BASED SQLi* |

Alright, now that we have the theory down, let's proceed with the practical part !


<details>
<summary class="summary">Union based SQLi</summary>

**Click to see the Union based SQLi (with english subtitle)**.

[![Minia_DOM_XSS](../../images/sqli/minia_sqli.png)](https://youtu.be/KWOs0Waq2TM?si=7aBslGJQ0NZEXC40&t=553)

</details>

## Blind SQL Injection

**Blind SQL injection**, or **Blind SQLi**, is quite common. It is referred to as "blind" because, in this type of SQL injection, the HTTP response **does not contain** the results of our SQL injection or any possible database errors.

In this kind of context, **,several solutions exist to continue exploiting a SQL injection**,. I won't go over all the techniques in this blogpost because it is already quite long, and covering all of them would make it endless. However, we will briefly review a **few blind SQL injection methods**.

### Time based blind SQL Injection

It is possible to perform a SQL injection **based on response delay**. Here's how it works:

The attacker uses **timing techniques to trigger significant delays** in the application's response. This can be achieved by using SQL instructions like `WAITFOR DELAY` or database-specific timing functions.

The attacker then **analyzes the application's behavior**. For instance, if the response is delayed by a certain period, it may indicate that the injected condition in the query is true.

::hint{type="info"}
Moreover, **based on response time**, it is possible to brute force columns and tables. For example, in the following gif, an attacker attempts to brute force the database name. Starting with `a%`, go through the entire alphabet, and when the attacker notices a **longer response time**, he moves on to **the next letter**. This allows you to guess the name of the table, column, or other database elements.
::

| ![TIME_BASED_EXAMPLE](../../images/sqli/time_based.gif) | 
|:--:| 
| *Bruteforcing SQLi using time based vector* |

<br>

### Conditional error SQL Injection

SQL injections based on conditional errors are easier to understand. Let's take an example where a web application uses cookies to determine if a user is known, using a SQL query like this:

| ![select_on_cookie](../../images/sqli/select_on_cookie.png) | 
|:--:| 
| *SQL select on cookie* |

Even though the server response doesn't return the results of the query, some data is sent through a 'Welcome' message on the page if the user is recognized.



This behavior is sufficient to exploit the Blind SQL injection vulnerability and retrieve information by triggering different responses conditionally, based on an injected condition.

For example, with these payloads, if the injection is successful, the first one will return the 'Welcome' message while the second one won't:
| ![example_payload_conditional_sqli](../../images/sqli/example_condi.png) | 
|:--:| 
| *Possible payload for conditional SQLi* |


| ![conditional_sqli](../../images/sqli/EN_conditional.gif) | 
|:--:| 
| *Conditional SQLi identification* |

In the same way as time-based attacks, you can brute force tables or passwords based on the message dependent on the SQL query :

| ![select_on_cookie_brutforce](../../images/sqli/guessing_payload_condi.png) | 
|:--:| 
| *Possible payload for conditional SQLi (brute force)* |

| ![conditional_bf](../../images/sqli/conditional_bf.gif) | 
|:--:| 
| *Conditional SQLi brute force* |


