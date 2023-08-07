---
tags: ['XSS', 'Vulgarisation', 'Web', 'Pentest']
description: "Permettez-moi de vulgariser l'une des vulnérabilités web les plus courantes, le Cross Site Scripting, également connu sous le nom de XSS."
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

<img src="../../images/XSS/how_web_work.png" alt="How_Does_The_Web_Works" data-size="original" class="center-image">

## JavaScript et définition globale de XSS

Dans cette introduction, j'ai parlé de **JavaScript**, un langage web permettant d'ajouter des fonctionnalités dynamiques à une page. C'est ici que notre attaque XSS intervient. Pour en donner une définition générale :
::hint{type="info"}
**Cross-Site Scripting est une attaque qui permet à un attaquant d'injecter du code malveillant dans une page web (généralement en JavaScript).**
::

Le code malveillant est ensuite **exécuté par le navigateur des utilisateurs qui visitent la page**. Cela peut permettre à l'attaquant de `voler des informations confidentielles` telles que des mots de passe, des cookies de session ou même des données bancaires. Plus d'informations sur les [impacts plus tard](XSS_for_dummies.md#impacts).

<img src="../../images/XSS/XSS_BASIC.gif" alt="gif_what_is" data-size="original">
<br>

XSS works on the principle of injection: **an attacker provides an untrusted input to a program, which then executes it, inducing a malicious action**.
Injections are a common attack vector in cybersecurity, always top 3 in the OWASP top 10 (a standard awareness document for developers and Web application security).

There are **3 types of XSS**:
1. [**Stored XSS**](XSS_for_dummies.md#stored-xss), 
2. [**Reflected XSS**](XSS_for_dummies.md#reflected-xss), 
3. [**DOM-based XSS**](XSS_for_dummies.md#dom-based-xss)
   
We'll review each type, let's go !

## Stored XSS

Let's imagine that you're behind your screen, using a website that **let you post comments on articles**.

If the site  **doesn't have sufficient protection against stored XSS attacks**, an attacker can post a comment containing a malicious script that will be stored on the server (in the comments database, for example).
::hint{type="warning"}
When other users access the article page and read the comments, their browser automatically executes the malicious script without them noticing.
::
<img loading="lazy" width="920" height="510" src="../../images/XSS/XSS_Stockee.gif" alt="Stored_XSS" data-size="original" >

::hint{type="info"}
**Stored XSS is self-explanatory in that the malicious script is stored on the server.**
::

It occurs when an **attacker manages to insert malicious code (usually in the form of a JavaScript script) into a Web page stored on the server**, which is then executed on the browsers of users accessing the page.

<details>
<summary class="summary">Stored XSS attack example</summary>

**Click to see the stored XSS attack example (with english subtitle)**.

[![Minia_DOM_XSS](../../images/XSS/XSS_minia.png)](https://youtu.be/DFP3K5ZL1fs?t=435)

</details>

## Reflected XSS

Let's imagine that, once again, you're using a website that let you **search for products by entering search terms in a search bar**.

::hint{type="warning"}
If the site doesn't have sufficient protection against reflected XSS attacks, an attacker can insert malicious code into the search term that will be returned in the results page response. 
::
When you open the results page, your browser automatically executes the malicious script without you being aware of it.

<img loading="lazy" width="920" height="510" src="../../images/XSS/XSS_Reflected.gif" alt="Stored_XSS" data-size="original">

::hint{type="info"}
**This is the most common XSS vulnerability. It occurs when an attacker inserts malicious code (JS) into an HTTP request, which is then returned in the web page response.**
::

If you've understood correctly, you're probably thinking that this XSS requires user interaction to work, as it is not stored. And you're right. That's why attackers often use **phishing with malicious links featuring reflected XSS** to make the victim execute the payload.

<details>
<summary class="summary">Reflected XSS attack example</summary>

**Click to see the reflected XSS attack example (with english subtitle)**.

[![Minia_DOM_XSS](../../images/XSS/XSS_minia.png)](https://youtu.be/DFP3K5ZL1fs?t=603)
</details>

## DOM-Based XSS

Small disclaimer, it is the most complicated XSS to understand. But before talking about the XSS itself, a point on what the DOM is necessary.

### What's DOM ?

::hint{type="info"}
The Document Object Model (DOM) is an in-memory representation of a web page that allows web developers to manipulate the structure, style, and content of the page using JavaScript.
::

Simply put, the DOM is a hierarchy of objects that represent HTML elements (e.g.`<p>, <div>, <img>` tags, etc.) and **can be manipulated using methods and JavaScript properties.**

<img loading="lazy" width="920" height="510" src="../../images/XSS/DOM-tree.png" alt="Stored_XSS" data-size="original">

Normally with this sentence you should start to understand where the vulnerability comes from.

Indeed, who says dynamic modification of the DOM with JavaScript says possibility of abusing these dynamic modifications.

::hint{type="info"}
The DOM BASED XSS will occur when an attacker manages to inject malicious code into the Web page by exploiting vulnerabilities in the Javascript code of the site.
::
When the user opens the web page, the malicious code is **executed directly on the user's browser**.

For example, if an HTML page contains this piece of vulnerable code:
```HTML
<script>
    document.write(“Site is at:” + document.location.href + “.”);
</script>
```

An attacker can add the JavaScript code to the URL pointing to this vulnerable page.
```HTML
#<script>alert(document.cookie)</script>
```
A pop-up is then displayed on the browser of the victim who will have carelessly clicked on this URL link.

::hint{type="info"}
Unlike Stored and Reflected XSS, DOM-Based XSS does not require server interaction to function, making it particularly difficult to detect and prevent.
::

<img loading="lazy" width="920" height="510" src="../../images/XSS/XSS_DOM.gif" alt="Stored_XSS" data-size="original">

<details>
<summary class="summary">DOM Based XSS attack example</summary>

**Click to see the DOM Based XSS attack example (with english subtitle)**.

[![Minia_DOM_XSS](../../images/XSS/XSS_minia.png)](https://youtu.be/DFP3K5ZL1fs?t=787)


</details>

## Impacts

**What can XSS be used for ?**

* **Executing arbitrary code** on a victim's browser can enable an attacker to perform cookie theft (when cookies are not secure, attackers can steal them and use them to authenticate themselves as victims without needing to know their password).

* **Keylogging** (attackers can spy on victims and retrieve their keystrokes).

* **Phishing** (attackers can modify the appearance and behavior of the site, encouraging victims to send sensitive information to the attackers' servers).
  

::hint{type="info"}
The actual impact of an XSS attack depends on the nature of the application, its functionality and data, and the status of the compromised user.
* In an application where **all users are anonymous and all information is public**, the impact will often be **minimal**.
* In an application containing **sensitive data, such as banking transactions, e-mails or medical records**, the impact will generally be **severe**.
* If the compromised user has elevated privileges in the application, the impact will generally be **critical**, enabling the attacker to take **full control of the vulnerable application** and compromise all users and their data.

::
## Remediation

* **Filter incoming data.** When user input is received, filter as strictly as possible on the basis of what is expected or valid input.

* **Encode data on exit (depending on the context).** When user-controllable data is sent in HTTP responses, encode the output to prevent it from being interpreted as active content.

  * `< converts to : &lt`
  * `> converts to : &gt`
  * `< converts to : \u003c`
  * `> becomes : \u003e`

* **Use appropriate response headers.** To avoid XSS in HTTP responses that aren't supposed to contain HTML or JavaScript, you can use **Content-Type and X-Content-Type-Options** headers to ensure that browsers interpret responses as you intend.

* **Content Security Policy (CSP)** - is the last line of defense that can be used to mitigate the severity of XSS vulnerabilities that still occur.
    CSP allows you to control various elements, such as loading external scripts and executing inline scripts.
    ::hint{type="info"}
    To deploy CSP, you need to include an HTTP response header called "Content-Security-Policy" with a value containing your policy.
    ::
    An example of CSP is as follows:<br/>

    ```default-src 'self'; script-src 'self'; object-src 'none'; frame-src 'none'; base-uri 'none';```<br />

    This policy specifies that resources like images and scripts can only be loaded from the same origin as the main page. Therefore, even if a hacker manages to inject an XSS payload, they can only load resources from the current origin. This significantly reduces the chances of an attacker exploiting the XSS vulnerability.
<img loading="lazy" width="920" height="510" src="../../images/XSS/CSP.gif" alt="Stored_XSS" data-size="original">


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
