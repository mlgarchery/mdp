# mdp
"mot de passe" is a password generator for those who don't want to rely on password managers for storing all the websites they use and their passwords.

## Issue with today's password manager
 
Don't get me wrong, they are very useful. Having to only remember one password, creating strong passwords for each website, inserting passwords automatically in the browser.. I like all these features.

*However*, once you start using one, you need to have access to it everywhere **(1)**, but as it is stocking your passwords, you need either to have it with you always or to cloud sync all your devices (syncing password over the cloud never felt like an option for me). Moreover, the web services you use are all listed in **(2)**. In case of a  malicious opening, attackers have just to chose which service to target first, among other bad things they could do.

## mdp concept

It's almost nothing.

The idea is to replicate password managers concepts without the stockage part: **mdp** is just a password generator based on a *discriminator* to identify each websites uniquely (for example, something related to its url - your choice) and on one *secret*.
**mdp** generates a password with that


```js
password = mdp(discriminator + secret)
/* example: 
for discriminator=twitter.com and secret=mySecre1_ 
mdp("twitter.commySecret1_") = 88d4757b6739c885b3d3817090cf8d4703581105 
(if mdp=sha1sum - for illustration purpose only, it's not a slow hash algorithm)
*/
```

**mdp** is essentially a slow hash function.

**(1)** Yeah, you also need **mdp** everywhere you need to login. The difference is that you can put it everywhere you want (browser, mobile, an USB key, write the code source on your toilet paper): it doesn't contain any critical data, none at all. Password managers keep a hash of your secret, not **mdp**.

**(2)** Even if your secret is discovered, attackers don't necessarily know where to go/ what they should target. If one password is leaked, you keep the advantages of password managers: only one password by service. And a strong one.

In the end, **mdp** usage requires more logic than memory (finding a good discriminator system). And a little logic doesn't hurt.


# Development

```bash
npm ci
# then
npm run dev # launch parcel-bundler hot-reloading dev server
```

(Until the CI is put in place):

Build the output index.html and bundle.js in docs with:
```
npm run build
```
