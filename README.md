# mdp
"mot de passe" is a password generator for those who don't want to rely (exclusively) on password managers for storing all the websites they use and their passwords.

*The words "discriminator", "website", "service" are used interchangeably in this document.*

## Issue with today's password managers
 
Don't get me wrong, they are very useful. Having to only remember one password, creating strong passwords for each website, inserting passwords automatically in the browser.. I like all these features.

*However*, once you start using one, you need to have access to it everywhere **(1)**, but as it is stocking your passwords, you need either to have it with you always or to cloud sync all your devices (syncing password over the cloud never felt like an option for me). Moreover, the web services you use are all listed in **(2)**. In case of a  malicious opening, attackers have just to chose which service to target first, among other bad things they could do.

## mdp concept

The idea is to replicate password managers concepts without the stockage part: **mdp** is just a password generator based on a *discriminator* to identify each websites uniquely (for example, something related to its url - your choice) and on one *secret*.
**mdp** generates a password with that


```js
password = mdp(discriminator + secret)
/* example: 
for discriminator=twitter.com and secret=mySecre1_ 
mdp("twitter.commySecret1_") = 88d4757b6739c885b3d3817090cf8d4703581105 
(if mdp=sha1sum - for illustration purpose only)
*/
```

**mdp** is essentially a slow hash function, for exemple [pbkdf2](https://en.wikipedia.org/wiki/PBKDF2)


**(1)** Yeah, you also need **mdp** everywhere you need to login. The difference is that you can put it everywhere you want (browser, mobile, an USB key, write the code source on your toilet paper): it doesn't contain any critical data. Password managers keep a hash of your secret, not **mdp**.

**(2)** Even if your secret is discovered, attackers don't necessarily know where to go/ what they should target. If one password is leaked, you keep the advantages of password managers: only one password by service. And a strong one.

In the end, **mdp** usage requires more logic than memory (finding a good discriminator system). And a little logic doesn't hurt.


## A suggestion I heard

We could simplify user discriminators management by storing a little file containing hash of them. If a user change a password for a certain discriminator, we would check if we don't have the hash of this discriminator in memory. If it is the case, we can store a second hash of "discriminator${n}" (appending "n" to the string, n being the number of time the password changed), changing the discriminator under the hood without changing what the user has to memorise.

But I don't like the idea of storing something. We'll end up having to sync a file on multiple devices like password managers. It should stay optionnal.

## Final thoughts

A password manager is great for storing a large number of discriminators and associated passwords (for people with access to a lot of machines/services, many discriminators may have to be memorized somewhere). **mdp** can complement this by securising all the personnal websites you can remember without needing to rely on a third party manager. You can alternatively use a tool that securely stores your discriminators and apply **mpd** to them, getting rid of pwd managers. 

# Development

```bash
npm ci
# then
npm run dev # launch parcel-bundler hot-reloading dev server
```

(Until the CI is put in place):

Build the output index.html and js bundle in `docs/` with:
```
npm run build
```
