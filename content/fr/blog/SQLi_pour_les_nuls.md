---
tags: ['Vulgarization', 'Web', 'Pentest', 'SQL', 'Injection']
description: "Plongez dans les profondeurs obscures de l'injection SQL : quand les données deviennent des armes"
translation: { "fr": "sqli_pour_les_nuls", "en": "sqli_for_dummies"}
---

# SQLi pour les nuls

J'imagine que vous avez déjà entendu parler des nombreuses **fuites de données perpétrées par des acteurs malveillants**. Parfois, plusieurs vulnérabilités sont utilisées pour obtenir et extraire les données convoitées, mais parfois, une simple injection permet d'accéder à l'ensemble de la base de données.


## Introduction

Aujourd'hui, nous abordons une vulnérabilité relativement connue, peut-être l'une des plus célèbres sur le Web : **l'injection SQL**. Mais avant de parler de l'injection SQL, nous devons comprendre le langage SQL et les architectures web. C'est parti.

### Qu'est-ce que SQL

::hint{type="info"}
**SQL signifie structured query language, et c'est un langage de programmation permettant d'interagir avec des bases de données relationnelles. Il permet de stocker, de manipuler et de récupérer des données de manière structurée.**

**Les bases de données relationnelles sont composées d'un ensemble de tables, qui sont utilisées pour stocker des données.**
::

Par exemple, pour mon site web de blog, j'ai ma base de données qui comprend une table `blog` stockant les articles et une table `commentaires`, stockant - je pense que vous l'avez deviné - les commentaires.

| ![exemple_table_sql_blog](../../images/SQLi/blog_sql_table_ex.gif) |
| :-----------------------------------------------------------: |
|               *Exemple de base de données et de table SQL*                |
 <br>

Stocker des données, c'est bien, mais les consulter, c'est encore mieux, c'est pourquoi il existe la requête **SELECT** en SQL pour récupérer des informations. Par exemple, `SELECT * FROM users` (ici, nous voulons toutes les données de la table `utilisateurs`).

| ![select_tout](../../images/SQLi/basic_select.png) | ![resultat_select_tout](../../images/SQLi/selectallresult.png) |
| :----------------------------------------------: | :---------------------------------------------------------: |
|               *Requête SELECT ALL*               |                  *Résultat de SELECT ALL*                   |

<br>
Pour affiner la requête SELECT, vous pouvez ajouter une clause, des opérateurs logiques et des fonctions d'agrégation :

* Tout d'abord, la clause `WHERE` dans une requête SELECT, qui vous permet simplement d'ajouter des conditions spécifiques.

| ![select_where_age](../../images/SQLi/whererequest.png) | ![resultat_select_where_age](../../images/SQLi/whereresult.png) |
| :-----------------------------------------------------: | :-----------------------------------------------------------: |
|                   *Sélection avec WHERE*                   |                  *Résultat de la sélection avec WHERE*                   |
<br>

* Les opérateurs logiques sont utilisés pour combiner des conditions.

| ![select_conditions_multiples](../../images/SQLi/requestmultipleconditions.png) | ![resultat_select_conditions_multiples](../../images/SQLi/multipleconditions.png) |
| :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|                        *Sélection avec des conditions multiples*                        |                  *Résultat de la sélection avec des conditions multiples*                  |
<br>

* Les fonctions d'agrégation, telles que `SUM`, `AVG` ou `COUNT`, calculent simplement des valeurs à partir des données de la table.

* Il y a aussi l'opérateur `UNION`, qui sera important plus tard, utilisé pour combiner les résultats de deux requêtes SELECT distinctes en une seule liste de résultats.

| ![requete_union](../../images/SQLi/union_sql.png) | ![resultat_union](../../images/SQLi/UNION_RESULT.png) |
| :-----------------------------------------------: | :-------------------------------------------------: |
|              *Requête SQL avec UNION*               |            *Résultat de la requête SQL UNION*            |
<br>

* Enfin, vous devriez savoir qu'il existe d'autres instructions en plus de `SELECT`, telles que `INSERT`, qui insère de nouvelles données dans une table, `UPDATE`, qui met à jour des données existantes, et `DELETE`, qui supprime des données.

### Architectures Web

Maintenant que vous avez compris, jetons un coup d'œil rapide aux architectures web.

La plupart des sites web fonctionnent avec une base de données sur un serveur tiers appelé **BACKEND**. Il existe plusieurs types d'architectures, telles que :
* 2 niveaux
* 3 niveaux (avec une partie arrière et une partie avant)
* microservices 
* architecture orientée services (SOA).

Rappelez-vous simplement que dans toutes ces architectures, le site web **envoie des requêtes à la base de données pour échanger des informations**, par exemple, pour récupérer tous les commentaires sur une page d'actualités.

Maintenant que les bases ont été posées, plongeons dans le vif du sujet : **l'injection SQL** !


## Qu'est-ce qu'une injection SQL ?

::hint{type="info"}
**L'injection SQL (SQLi) est une vulnérabilité de sécurité Web qui permet à un attaquant d'interférer avec les requêtes d'une application à sa base de données.**
::

Cela permet généralement à un attaquant d'afficher des données auxquelles il n'aurait normalement pas accès. Cela peut inclure des données appartenant à d'autres utilisateurs ou toutes autres données auxquelles l'application elle-même peut accéder.

Dans de nombreux cas, **un attaquant peut modifier ou supprimer ces données**, provoquant des changements persistants dans le contenu ou le comportement de l'application.

**Vous vous demandez peut-être comment cela fonctionne ? Voici un petit laboratoire pour vous aider à comprendre !**

<details>
<summary class="summary">Bypass de base via injection SQL</summary>

**Cliquez pour voir le contournement de base de l'injection SQL.**

[![Minia_DOM_XSS](../../images/sqli/minia_sqli.png)](https://youtu.be/KWOs0Waq2TM?si=Lt-vOesJ57Eo6HEk&t=269)

</details>

## Injection SQL basée sur UNION

Il est bon de connaître les injections SQL de base, mais il y a un problème : **comment récupérer des données d'autres tables ?**

Eh bien, vous pouvez le faire avec l'opérateur `UNION`. **L'injection SQL basée sur UNION permet à un attaquant de récupérer des données d'autres tables.**

**Comment cela fonctionne-t-il ?**

Pour qu'une requête UNION fonctionne, **deux conditions essentielles doivent être remplies** :

1. **Les requêtes individuelles doivent renvoyer le même nombre de colonnes.**

| ![SQL_UNION_OKAY_1](../../images/SQLi/union_okay_1.png) | ![SQL_UNION_PASOKAY_1](../../images/SQLi/union_not_okay.png) |
| :-----------------------------------------------: | :-------------------------------------------------: |
|              *SQL union query okay*               |            *SQL union query pas okay (pck nombre différent de colonnes)*            |


2. **Les types de données de chaque colonne doivent être compatibles dans les requêtes individuelles, c'est-à-dire qu'il ne doit y avoir aucun mélange d'integers avec des chaînes de caractères.**

| ![SQL_UNION_OKAY_2](../../images/SQLi/union_okay_2.png) | ![SQL_UNION_PASOKAY_2](../../images/SQLi/sql_union_not_okay_2.png) |
| :-----------------------------------------------: | :-------------------------------------------------: |
|               *Requête UNION SQL correcte*              |             *Requête UNION SQL incorrecte (en raison de types de données différents entre Age et Nom)*            |
<br>
Pour mener à bien une injection SQL basée sur UNION (SQLi), vous devez déterminer :

1. **Combien de colonnes sont renvoyées par la requête d'origine ?**
    * En utilisant une méthodologie basée sur les erreurs, nous soumettons une liste de déclarations UNION SELECT :

| ![UNION_NUMBER_OF_COLUMNS](../../images/sqli/UNION_NUMBER_OF_COLUMNS.gif) | 
|:--:| 
| *Trouver le bon nombre de colonnes pour une injection SQL basée sur UNION* |

2. **Quelles colonnes renvoyées par la requête d'origine ont un type de données approprié pour contenir les résultats de la requête injectée ?** 
    * Pour ce faire, nous testerons chaque colonne une par une comme suit :

| ![UNION_TYPE_OF_COLUMNS](../../images/sqli/UNION_find_columns_containing_text.gif) | 
|:--:| 
| *Trouver le bon type de données de la colonne pour une injection SQL basée sur UNION* |

Maintenant que nous avons compris la théorie, passons à la partie pratique !

<details>
<summary class="summary">SQLi basée sur UNION</summary>

**Cliquez pour voir l'injection SQL basée sur UNION**.

[![Minia_DOM_XSS](../../images/sqli/minia_sqli.png)](https://youtu.be/KWOs0Waq2TM?si=7aBslGJQ0NZEXC40&t=553)

</details>

## Injection SQL aveugle

L'injection SQL aveugle, ou Blind SQLi, est assez courante. Elle est appelée "aveugle" car, dans ce type d'injection SQL, la réponse HTTP **ne contient pas** les résultats de notre injection SQL ni d'éventuelles erreurs de la base de données.

Dans ce genre de contexte, **plusieurs solutions existent pour continuer à exploiter une injection SQL**. Je ne vais pas passer en revue toutes les techniques dans ce post car il est déjà assez long, et les couvrir toutes le rendrait interminable. Cependant, nous passerons brièvement en revue **quelques méthodes d'injection SQL aveugle**.

### Injection SQL aveugle basée sur le temps

Il est possible d'effectuer une injection SQL **basée sur le délai de réponse**. Voici comment cela fonctionne :

L'attaquant utilise des **techniques de temporisation pour déclencher des retards significatifs** dans la réponse de l'application. Cela peut être réalisé en utilisant des instructions SQL telles que `WAITFOR DELAY` ou des fonctions de temporisation spécifiques à la base de données.

L'attaquant **analyse ensuite le comportement de l'application**. Par exemple, si la réponse est retardée pendant une certaine période, cela peut indiquer que la condition injectée dans la requête est vraie.

::hint{type="info"}
De plus, **en fonction du temps de réponse**, il est possible de brute forcer des colonnes et des tables. Par exemple, dans le gif suivant, un attaquant tente de forcer le nom de la base de données. En commençant par `a%`, il parcourt l'alphabet entier, et lorsque l'attaquant remarque un **temps de réponse plus long**, il passe à **la lettre suivante**. Cela permet de deviner le nom de la table, de la colonne ou d'autres éléments de la base de données.
::

| ![TIME_BASED_EXAMPLE](../../images/sqli/time_based.gif) | 
|:--:| 
| *Bruteforce d'un mot de passe via injection blind SQLi basée sur le temps* |

### Injection SQL basée sur des erreurs conditionnelles


Les injections SQL basées sur des erreurs conditionnelles sont plus faciles à comprendre. Prenons un exemple où une application web utilise des cookies pour déterminer si un utilisateur est connu, en utilisant une requête SQL comme celle-ci :

| ![select_on_cookie](../../images/sqli/select_on_cookie.png) | 
|:--:| 
| *Requête SQL sur un cookie* |

Même si la réponse du serveur ne renvoie pas les résultats de la requête, certaines données sont envoyées via un message de `Bienvenue` sur la page si l'utilisateur est reconnu.

Ce comportement est **suffisant pour exploiter la vulnérabilité d'injection SQL à l'aveugle** et récupérer des informations en **déclenchant conditionnellement différentes réponses**, en fonction d'une condition injectée.


Par exemple, avec ces charges utiles(payload), si l'injection réussit, la première retournera le message `Bienvenue`, tandis que la deuxième ne le fera pas :
| ![example_payload_conditional_sqli](../../images/sqli/example_condi.png) | 
|:--:| 
| *Charge utile possible pour une injection SQL conditionnelle* |

| ![conditional_sqli](../../images/sqli/FR_Conditional.gif) | 
|:--:| 
| *Identification d'une injection SQL conditionnelle* |
<br>

De la même manière que pour les attaques basées sur le temps, vous pouvez effectuer une force brute sur les tables ou les mots de passe **en fonction du message qui dépend de la requête SQL** :

| ![select_on_cookie_brutforce](../../images/sqli/guessing_payload_condi.png) | 
|:--:| 
| *Charge utile possible pour une injection SQL conditionnelle (force brute)* |

| ![conditional_bf](../../images/sqli/conditional_bf.gif) | 
|:--:| 
| *Bruteforce via injection SQL conditionnelle* |


### Injection SQL aveugle out-of-band

Si vous ne parvenez pas à récupérer les résultats **directement depuis le serveur**, une approche consiste à envoyer les résultats vers un serveur que vous contrôlez. C'est l'objectif de **l'injection SQL aveugle hors bande (out-of-band)**.

Dans ce scénario, un attaquant exfiltre des données de **la table `users` où le nom d'utilisateur est `administrateur`** vers un nom de domaine contrôlé par l'attaquant.

| ![out_of_band_sqli](../../images/sqli/outofbandsqli.png) | 
|:--:| 
| *Charge utile possible pour une injection SQL OAST (out-of-band)* |

| ![OAST_SQLi](../../images/sqli/OAST_SQLi.gif) | 
|:--:| 
| *Exemple d'injection SQL hors bande* |

## Injection SQL de second ordre

Jusqu'à présent, ce que nous avons vu, ce sont des `injections SQL de premier ordre`. Dans ce cas, l'application **prend en compte les entrées de l'utilisateur à partir d'une requête HTTP et, lors du traitement de cette requête, incorpore les entrées dans une requête SQL non sécurisée, et nous obtenons le résultat dans la réponse HTTP.**

L'injection SQL de second ordre est un peu différente. Dans ce scénario, l'application prend les entrées de l'utilisateur à partir d'une requête HTTP et les stocke pour une utilisation future. Cela se fait généralement en **plaçant les entrées dans une base de données, mais aucune vulnérabilité n'apparaît au moment du stockage des données. Plus tard, lors du traitement d'une autre requête HTTP, l'application récupère les données stockées et les incorpore dans une requête SQL non sécurisée**.

| ![second-order-sql-injection](../../images/sqli/second-order-sql-injection.svg) | 
|:--:| 
| *Injection SQL de second ordre (portswigger.net)* |

## Impacts

Maintenant que nous avons passé en revue les différents types d'**injections SQL**, passons aux **impacts**, même si vous avez probablement déjà une idée en fonction des exemples :

1. **Accès non autorisé aux données** : Les attaquants peuvent utiliser les injections SQL pour contourner les mécanismes d'authentification et d'autorisation, ce qui leur permet d'accéder à des données sensibles auxquelles ils ne devraient pas avoir accès. Cela peut inclure des informations confidentielles sur les utilisateurs, des données financières, des mots de passe, et plus encore.

2. **Manipulation des données** : Les injections SQL permettent aux attaquants de modifier, d'ajouter ou de supprimer des données dans la base de données. Cela peut entraîner une altération ou une suppression des données, compromettant l'intégrité des informations stockées et provoquant des problèmes fonctionnels pour l'application.

3. **Exécution de commandes système** : Dans certains cas, les attaquants peuvent exploiter les injections SQL pour exécuter des commandes système sur le serveur hébergeant l'application web. Cela peut leur permettre d'accéder à d'autres ressources du serveur, de compromettre la sécurité du système d'exploitation ou de réaliser des actions malveillantes.

4. **Dégradation des performances** : Les injections SQL peuvent surcharger les ressources du serveur et dégrader les performances de l'application web. Les requêtes SQL malveillantes peuvent être complexes et gourmandes en ressources, entraînant des temps de réponse plus longs, des interruptions du serveur ou des ralentissements importants de l'application.

5. **Réputation et confiance endommagées** : Si une application web est victime d'une attaque par injection SQL et que des données sensibles d'utilisateurs sont compromises, cela peut avoir un impact négatif sur la réputation de l'entreprise ou de l'organisation. Les utilisateurs peuvent perdre confiance en l'application et en la capacité de l'entreprise à protéger leurs informations personnelles.

## Mesures de remédiation

1. **Utiliser des requêtes préparées ou des requêtes paramétrées fournies par votre langage de programmation et votre framework**. Cela sépare le code SQL des données d'entrée de l'utilisateur, réduisant considérablement le risque d'injections SQL.

| ![Prepared_statementn](../../images/sqli/Prepared_statement.png) | 
|:--:| 
| *Exemple de requête préparée* |

2. **Assurer une validation et un filtrage approfondis de toutes les entrées utilisateur**. Utiliser des techniques de validation appropriées telles que la vérification des types de données attendus, la limitation des caractères spéciaux, le filtrage des entrées potentiellement dangereuses, etc.

| ![filters](../../images/sqli/filters.png) | 
|:--:| 
| *Code pour filtrer les entrées* |

3. **Principe du moindre privilège** : Accordez uniquement les privilèges nécessaires aux comptes d'accès à la base de données utilisés par l'application. Évitez d'utiliser des comptes avec des privilèges élevés, tels que des privilèges administratifs, pour l'accès à la base de données.

4. **Principe de la défense en profondeur** : En plus de sécuriser les applications web, assurez-vous que l'infrastructure sous-jacente, y compris les serveurs de base de données, est également sécurisée. Appliquez les mises à jour de sécurité, configurez des pare-feu, limitez les connexions externes et utilisez des mécanismes de chiffrement pour les données sensibles.

5. **Tests de sécurité réguliers** : Effectuez régulièrement des tests de sécurité, y compris des tests d'injection SQL, pour identifier les vulnérabilités et les corriger rapidement. Utilisez des outils d'analyse de sécurité automatisés et effectuez des audits de code pour détecter d'éventuelles failles.

6. **Sensibilisation et formation des développeurs** : Assurez-vous que les développeurs sont conscients des risques liés aux injections SQL et formez-les aux bonnes pratiques de sécurité pour sécuriser les applications web. Promouvez une culture de la sécurité dans le développement logiciel.

## Ressources

::embedUrl{url="https://portswigger.net/web-security/sql-injection"}
Portswigger
::

::embedUrl{url="https://fr.wikipedia.org/wiki/Injection_SQL"}
Wikipedia
::
