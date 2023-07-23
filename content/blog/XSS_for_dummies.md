---
tags: ['XSS', 'Vulgarization', 'Web', 'Pentest']
description: "Today, we're going to take a look at the origin of one of the most common and exploited vulnerability on the Internet: The XSS also known as cross site scripting. If you are not familiar with web security, don't worry, I'll explain everything ! **Let's get going !**"
---

# XSS for dummies

Today, we're going to take a look at the origin of one of the most common and exploited vulnerability on the Internet: The **XSS** also known as **cross site scripting**. If you are **not familiar** with web security, don't worry, I'll explain everything ! **Let's get going !**

## Introduction

### How the web works

But before we explain what an `XSS` is, we need to understand how a web page works to get the basics right.

::hint{type="info"}
A **web page** is a **collection of files**, such as *HTML, CSS and JavaScript*, which are *downloaded* to a web `browser` and displayed as web pages. Here's how it works: 

1. Your web `browser` (e.g. Google Chrome, Mozilla Firefox, Safari) **sends a request (HTTP request) to a web server** to retrieve a web page.
2. The web server **receives the request and sends the requested web page to your browser** using (once again) the HTTP protocol.
3. Your `browser` **receives the server's response in the form of HTML, CSS and JavaScript** code.
4. Your `browser` then analyzes the HTML code and **builds a visual representation of the web page**. It interprets HTML tags to determine the page structure, CSS styles to determine the visual presentation, and executes JavaScript code to add dynamic functionality to the page.
   * For example, for javascript to work, the `browser` needs to find the`<script> </script>`tags, for a paragraph on a web page, it needs the`<p>`tag. Without this, your web page won't display or function normally.

5. The `browser` displays the web page to the user. The user **can interact with the page by clicking on links, filling in forms, using buttons and menus, etc**.
6. If the user performs actions that require additional requests to the server (e.g., submitting a form), the `browser` sends new HTTP requests and the cycle starts again.
::

### Javascript and global XSS definition

In this introduction, I talked about **javascript**, a web language for adding dynamic functionality to a page. This is where our XSS attack comes in. To give a general definition :
::hint{type="info"}
**Cross-Site Scripting is an attack that allows an attacker to inject malicious code into a web page (usually javascript).**
::

This code is then **executed by the browser of users visiting the page**. This can enable the attacker to `steal confidential information`, such as passwords, session cookies or even banking data. More on the impact of this later.

XSS works on the principle of injection: **an attacker provides an untrusted input to a program, which then executes it, inducing a malicious action**.
Injections are a common attack vector in cybersecurity, always top 3 in the OWASP top 10 (a standard awareness document for developers and Web application security), and that includes many injections.

There are **3 types of XSS**:

**Stored XSS**, **Reflected XSS** and **DOM-based XSS**. We'll review type, let's go !

## Stored XSS

Let's imagine that you're behind your screen, using a website that let you post comments on articles (like Youtube).

If the site doesn't have sufficient protection against stored XSS attacks, an attacker can post a comment containing a malicious script that will be stored on the server (in the comments database, for example).

When other users access the article page and read the comments, their browser automatically executes the malicious script without them noticing.

::hint{type="info"}
**Stored XSS is self-explanatory in that the malicious script is stored on the server.**
::

It occurs when an **attacker manages to insert malicious code (usually in the form of a JavaScript script) into a Web page stored on the server**, which is then executed on the browsers of users accessing the page.

<details>
<summary class="summary">Stored XSS attack example</summary>
</details>

## Reflected XSS

Let's imagine that, once again, you're using a website that lets you search for products by entering search terms in a search bar. (fruit, for example).

If the site doesn't have sufficient protection against reflected XSS attacks, an attacker can insert malicious code into the search term that will be returned in the results page response. 

When you open the results page, your browser automatically executes the malicious script without you being aware of it.

::hint{type="info"}
**This is the most common XSS vulnerability. It occurs when an attacker inserts malicious code (JS) into an HTTP request, which is then returned in the web page response.**
::

If you've understood correctly, you're probably thinking that this XSS requires user interaction to work, as it is not stored. And you're right. That's why attackers often use phishing with malicious links featuring reflected XSS to make the victim execute the payload.

<details>
<summary class="summary">Reflected XSS attack example</summary>
</details>

## DOM-Based XSS

Now we are going to talk about the DOM based XSS, small disclaimer, it is the most complicated XSS to understand. But before talking about the XSS itself, a point on what the DOM is necessary.

The Document Object Model (DOM) is an in-memory representation of a web page that allows web developers to manipulate the structure, style, and content of the page using JavaScript.

Simply put, the DOM is a hierarchy of objects that represent HTML elements (e.g.`<p>, <div>, <img>` tags, etc.) and can be manipulated using methods and JavaScript properties.

Normally with this sentence you should start to understand where the vulnerability comes from.

Indeed, who says dynamic modification of the DOM with JavaScript says possibility of abusing these dynamic modifications.

The DOM BASED XSS will occur when an attacker manages to inject malicious code into the Web page by exploiting vulnerabilities in the Javascript code of the site.

When the user opens the web page, the malicious code is executed directly on the user's browser.

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

Unlike Stored and Reflected XSS, DOM-Based XSS does not require server interaction to function, making it particularly difficult to detect and prevent.

<details>
<summary class="summary">DOM Based XSS attack example</summary>
</details>

## Impacts

**What can XSS be used for ?**

* Executing arbitrary code on a victim's browser can enable an attacker to perform cookie theft (when cookies are not secure, attackers can steal them and use them to authenticate themselves as victims without needing to know their password)

* Keylogging (attackers can spy on victims and retrieve their keystrokes) 

* Phishing (attackers can modify the appearance and behavior of the site, encouraging victims to send sensitive information to the attackers' servers).
  

::hint{type="info"}
The actual impact of an XSS attack depends on the nature of the application, its functionality and data, and the status of the compromised user.

* In an application where all users are anonymous and all information is public, the impact will often be minimal.
* In an application containing sensitive data, such as banking transactions, e-mails or medical records, the impact will generally be severe.
* If the compromised user has elevated privileges in the application, the impact will generally be critical, enabling the attacker to take full control of the vulnerable application and compromise all users and their data.

::
## Remediation

Filter incoming data. When user input is received, filter as strictly as possible on the basis of what is expected or valid input.

Encode data on exit. When user-controllable data is sent in HTTP responses, encode the output to prevent it from being interpreted as active content. Depending on the output context, it may be necessary to apply combinations of HTML, URL, JavaScript and CSS coding.	

* `< converts to : &lt`
* `> converts to : &gt`

In a JavaScript string context, non-alphanumeric values must be encapsulated in Unicode:

* `< converts to : \u003c`
* `> becomes : \u003e`

Use appropriate response headers. (We'll take a look at the HTTP protocol in a future video on request smuggling).

And to avoid XSS in HTTP responses that aren't supposed to contain HTML or JavaScript, you can use Content-Type and X-Content-Type-Options headers to ensure that browsers interpret responses as you intend.

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