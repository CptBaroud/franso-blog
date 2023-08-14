---
tags: ['XSS', 'Vulgarisation', 'Web', 'Pentest']
description: "Permettez-moi de vulgariser l'une des vulnérabilités web les plus courantes, le Cross Site Scripting, également connu sous le nom de XSS."
translation: { "fr": "xss_pour_les_nuls", "en": "xss_for_dummies"}
---
  
# XSS pour les nuls

Aujourd'hui, nous allons jeter un coup d'œil à l'origine de l'une des vulnérabilités les plus courantes et exploitées sur Internet : le **XSS**, également connu sous le nom de **cross-site scripting**. Si vous n'êtes **pas familier** avec la sécurité web, ne vous inquiétez pas, je vais tout vous expliquer ! **Commençons !**

## Comment fonctionne le web

Mais avant d'expliquer ce qu'est un `XSS`, nous devons comprendre comment fonctionne une page web pour acquérir les bases.

::hint{type="info"}
Une **page web** est une **collection de fichiers**, tels que *HTML, CSS et JavaScript*, qui sont *téléchargés* dans un `navigateur` web et affichés en tant que pages web. Voici comment cela fonctionne :

1. Votre `navigateur` web (par exemple, Google Chrome, Mozilla Firefox, Safari) **envoie une requête (HTTP request) à un serveur web** pour récupérer une page web.
2. Le serveur web **reçoit la requête et envoie la page web demandée à votre navigateur** en utilisant (encore une fois) le protocole HTTP.
3. Votre `navigateur` **reçoit la réponse du serveur sous forme de code HTML, CSS et JavaScript**.
4. Votre `navigateur` analyse ensuite le code HTML et **construit une représentation visuelle de la page web**. Il interprète les balises HTML pour déterminer la structure de la page, les styles CSS pour déterminer la présentation visuelle, et exécute le code JavaScript pour ajouter des fonctionnalités dynamiques à la page.
   * Par exemple, pour que JavaScript fonctionne, le `navigateur` doit trouver les balises `<script> </script>`, pour un paragraphe sur une page web, il a besoin de la balise `<p>`. Sans cela, votre page web ne s'affichera ni ne fonctionnera normalement.

5. Le `navigateur` affiche la page web à l'utilisateur. L'utilisateur **peut interagir avec la page en cliquant sur des liens, en remplissant des formulaires, en utilisant des boutons et des menus, etc**.
6. Si l'utilisateur effectue des actions qui nécessitent des demandes supplémentaires au serveur (par exemple, soumettre un formulaire), le `navigateur` envoie de nouvelles requêtes HTTP, et le cycle recommence.
::

| ![how_web_works](../../images/XSS/how_web_work_fr.png) | 
|:--:| 
| *Schema expliquant le fonctionnement du web* |

## JavaScript et définition globale de XSS

Dans cette introduction, j'ai parlé de **JavaScript**, un langage web permettant d'ajouter des fonctionnalités dynamiques à une page. C'est ici que notre attaque XSS intervient. Pour en donner une définition générale :
::hint{type="info"}
**Cross-Site Scripting est une attaque qui permet à un attaquant d'injecter du code malveillant dans une page web (généralement en JavaScript).**
::

Le code malveillant est ensuite **exécuté par le navigateur des utilisateurs qui visitent la page**. Cela peut permettre à l'attaquant de `voler des informations confidentielles` telles que des mots de passe, des cookies de session ou même des données bancaires. Plus d'informations sur les [impacts plus tard](XSS_pour_les_nuls.md#impacts).


| ![FR_XSS_BASIC](../../images/XSS/FR_XSS_BASIC.gif) | 
|:--:| 
| *Fonctionnement d'une XSS basique* |
<br>

Le XSS fonctionne sur le principe de l'injection : **un attaquant fournit une entrée non fiable à un programme, qui l'exécute ensuite, induisant une action malveillante**.
Les injections sont un vecteur d'attaque courant en cybersécurité, toujours dans le top 3 du top 10 de l'OWASP (un document de sensibilisation standard pour les développeurs et la sécurité des applications Web).

Il existe **3 types de XSS** :
1. [**XSS stockée**](XSS_pour_les_nuls.md#xss-stockée),
2. [**XSS réfléchie**](XSS_pour_les_nuls.md#xss-réfléchie),
3. [**XSS basée sur le DOM**](XSS_pour_les_nuls.md#xss-basée-sur-le-dom)

   
Nous allons passer en revue chaque type, c'est parti !

## XSS stockée

Imaginez que vous soyez derrière votre écran, en train d'utiliser un site web qui **vous permet de poster des commentaires sur des articles**.

Si le site **n'a pas une protection suffisante contre les attaques XSS stockées**, un attaquant peut poster un commentaire contenant un script malveillant qui sera stocké sur le serveur (dans la base de données des commentaires, par exemple).
::hint{type="warning"}
Lorsque d'autres utilisateurs accèdent à la page de l'article et lisent les commentaires, leur navigateur exécute automatiquement le script malveillant sans qu'ils s'en rendent compte.
::


| ![FR_XSS_Stockee](../../images/XSS/FR_XSS_Stockee.gif) | 
|:--:| 
| *Fonctionnement d'une XSS stockée* |

::hint{type="info"}
**La XSS stockée est explicite en ce que le script malveillant est stocké sur le serveur.**
::

Cela se produit lorsque qu'un **attaquant parvient à insérer un code malveillant (généralement sous forme d'un script JavaScript) dans une page Web stockée sur le serveur**, qui est ensuite exécuté sur les navigateurs des utilisateurs accédant à la page.

<details>
<summary class="summary">Exemple d'attaque XSS stockée</summary>

**Cliquez pour voir l'exemple d'attaque XSS stockée**.


[![Minia_DOM_XSS](../../images/XSS/XSS_minia.png)](https://youtu.be/DFP3K5ZL1fs?t=435)

</details>

## XSS réfléchie

Imaginons à nouveau que vous utilisiez un site web qui vous permet de **chercher des produits en entrant des termes de recherche dans une barre de recherche**.

::hint{type="warning"}
Si le site n'a pas une protection suffisante contre les attaques XSS réfléchies, un attaquant peut insérer un code malveillant dans le terme de recherche qui sera renvoyé dans la réponse de la page de résultats.
::
Lorsque vous ouvrez la page de résultats, votre navigateur exécute automatiquement le script malveillant sans que vous en ayez conscience.



| ![FR_XSS_Reflected](../../images/XSS/FR_XSS_Reflected.gif) | 
|:--:| 
| *Fonctionnement d'une XSS réfléchie* |


::hint{type="info"}
**Il s'agit de la vulnérabilité XSS la plus courante. Elle se produit lorsque qu'un attaquant insère un code malveillant (JS) dans une requête HTTP, qui est ensuite renvoyée dans la réponse de la page web.**
::

Si vous avez bien compris, vous pensez probablement que cette XSS nécessite une interaction de l'utilisateur pour fonctionner, car elle n'est pas stockée. Et vous avez raison. C'est pourquoi les attaquants utilisent souvent **le phishing avec des liens malveillants contenant une XSS réfléchie** pour faire exécuter la charge utile par la victime.

<details>
<summary class="summary">Exemple d'attaque XSS réfléchie</summary>

**Cliquez pour voir l'exemple d'attaque XSS réfléchie**.

[![Minia_DOM_XSS](../../images/XSS/XSS_minia.png)](https://youtu.be/DFP3K5ZL1fs?t=603)
</details>

## XSS basée sur le DOM

Petite mise en garde, c'est la XSS la plus compliquée à comprendre. Mais avant de parler de la XSS elle-même, un point sur ce qu'est le DOM est nécessaire.

### Qu'est-ce que le DOM ?

::hint{type="info"}
Le Modèle d'Objet de Document (DOM) est une représentation en mémoire d'une page web qui permet aux développeurs web de manipuler la structure, le style et le contenu de la page en utilisant JavaScript.
::

Pour simplifier, le DOM est une hiérarchie d'objets qui représentent les éléments HTML (par exemple, les balises `<p>, <div>, <img>`, etc.) et **peuvent être manipulés à l'aide de méthodes et de propriétés JavaScript.**

| ![DOM-tree](../../images/XSS/DOM-tree.png) | 
|:--:| 
| *Arbre DOM* |

Normalement, avec cette phrase, vous devriez commencer à comprendre d'où provient la vulnérabilité.

En effet, qui dit modification dynamique du DOM avec JavaScript dit possibilité d'exploiter ces modifications dynamiques.

::hint{type="info"}
La XSS basée sur le DOM se produira lorsque qu'un attaquant parvient à injecter un code malveillant dans la page Web en exploitant les vulnérabilités du code Javascript du site.
::
Lorsque l'utilisateur ouvre la page web, le code malveillant est **exécuté directement sur le navigateur de l'utilisateur**.

Par exemple, si une page HTML contient ce morceau de code vulnérable :

```HTML
<script>
    document.write(“Le site est:” + document.location.href + “.”);
</script>
```

Un attaquant peut ajouter le code JavaScript à l'URL pointant vers cette page vulnérable.
```HTML
#<script>alert(document.cookie)</script>
```
Une fenêtre pop-up est alors affichée sur le navigateur de la victime qui aura imprudemment cliqué sur ce lien URL.

::hint{type="info"}
Contrairement aux XSS stockées et réfléchies, la XSS basée sur le DOM ne nécessite pas d'interaction avec le serveur pour fonctionner, ce qui le rend particulièrement difficile à détecter et à prévenir.
::

| ![FR_XSS_DOM](../../images/XSS/FR_XSS_DOM.gif) | 
|:--:| 
| *Fonctionnement d'une DOM BASED XSS* |

<details>
<summary class="summary">Exemple d'attaque XSS basée sur le DOM</summary>

**Cliquez pour voir l'exemple d'attaque XSS basée sur le DOM**.

[![Minia_DOM_XSS](../../images/XSS/XSS_minia.png)](https://youtu.be/DFP3K5ZL1fs?t=787)


</details>

## Impacts

**À quoi peut servir le XSS ?**

* **Exécuter un code arbitraire** sur le navigateur d'une victime peut permettre à un attaquant de voler des cookies (lorsque les cookies ne sont pas sécurisés, les attaquants peuvent les voler et les utiliser pour s'authentifier en tant que victimes sans avoir besoin de connaître leur mot de passe).

* **Enregistrement des frappes** (les attaquants peuvent espionner les victimes et récupérer leurs frappes clavier).

* **Phishing** (les attaquants peuvent modifier l'apparence et le comportement du site, incitant les victimes à envoyer des informations sensibles aux serveurs des attaquants).
  
::hint{type="info"}
L'impact réel d'une attaque XSS dépend de la nature de l'application, de ses fonctionnalités et de ses données, ainsi que du statut de l'utilisateur compromis.
* Dans une application où **tous les utilisateurs sont anonymes et où toutes les informations sont publiques**, l'impact sera souvent **minime**.
* Dans une application contenant **des données sensibles, comme des transactions bancaires, des e-mails ou des dossiers médicaux**, l'impact sera généralement **grave**.
* Si l'utilisateur compromis a des privilèges élevés dans l'application, l'impact sera généralement **critique**, permettant à l'attaquant de prendre **le contrôle total de l'application vulnérable** et de compromettre tous les utilisateurs et leurs données.
::

## Mesures correctives

* **Filtrer les données entrantes.** Lorsque des entrées utilisateur sont reçues, filtrez aussi strictement que possible en fonction de ce qui est attendu ou de ce qui constitue une entrée valide.

* **Encoder les données en sortie (en fonction du contexte).** Lorsque des données contrôlables par l'utilisateur sont envoyées dans les réponses HTTP, encodez la sortie pour éviter qu'elle ne soit interprétée comme du contenu actif.

  * `<` devient : &lt;
  * `>` devient : &gt;
  * `<` devient : \u003c
  * `>` devient : \u003e

* **Utiliser des en-têtes de réponse appropriées.** Pour éviter les XSS dans les réponses HTTP qui ne sont pas censées contenir de HTML ou de JavaScript, vous pouvez utiliser les en-têtes **Content-Type et X-Content-Type-Options** pour vous assurer que les navigateurs interprètent les réponses comme vous l'avez prévu.

* **Politique de sécurité du contenu (CSP)** - est la dernière ligne de défense qui peut être utilisée pour atténuer la gravité des vulnérabilités XSS qui surviennent toujours.
    CSP vous permet de contrôler divers éléments, tels que le chargement de scripts externes et l'exécution de scripts en ligne.
    ::hint{type="info"}
    Pour déployer CSP, vous devez inclure un en-tête de réponse HTTP appelé "Content-Security-Policy" avec une valeur contenant votre politique.
    ::
    Un exemple de CSP est le suivant :<br/>

    ```default-src 'self'; script-src 'self'; object-src 'none'; frame-src 'none'; base-uri 'none';```<br />

    Cette politique spécifie que les ressources telles que les images et les scripts ne peuvent être chargées que depuis la même origine que la page principale. Par conséquent, même si un pirate parvient à injecter une charge utile XSS, il ne peut charger que des ressources depuis l'origine actuelle. Cela réduit considérablement les chances pour un attaquant d'exploiter la vulnérabilité XSS.


| ![CSP](../../images/XSS/CSP_fr.gif) | 
|:--:| 
| *Fonctionnement des CSP* |

## Resources

::embedUrl{url="https://icesi.fr/5_Faille-XSS-ou-le-Cross-Site-Scripting.html"}
5_Faille-XSS-ou-le-Cross-Site-Scripting | Icesi
::

::embedUrl{url="https://www.certilience.fr/2019/09/vulnerabilite-xss-injection-de-code-indirecte-a-distance/"}
vulnerabilite-xss-injection | Certilience
::

::embedUrl{url="https://www.kaspersky.fr/resource-center/definitions/what-is-a-cross-site-scripting-attack"}
what-is-a-cross-site-scripting-attack | Kapersky
::

::embedUrl{url="https://portswigger.net/web-security/cross-site-scripting"}
cross-site-scripting | Portswigger
::

::embedUrl{url="https://www.thehacker.recipes/web/inputs/xss"}
XSS | TheHackerRecipes
::

::embedUrl{url="https://www.youtube.com/watch?v=hSc6WmsbXmI&ab_channel=TraceTheCode"}
TraceTheCode
::
