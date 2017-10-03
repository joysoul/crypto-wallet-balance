# Crypto wallet balance

A simle web app built with [next.js](https://github.com/zeit/next.js/).  
Add Bitcoin or Ethereum wallet (public) addresses to keep track of their balance.  
The addresses are kept in your web browsers localstorage.

The web app is 100% static, there is no server keeping track of addresses or anything.  
Your web browser does the communication with API:s to get the addresses balances and then the conversion to fiat currencies.

## NOT a wallet
This is not a wallet. You cannot create transactions or addresses here. This is just a simple app to keep track of wallets balancies.

## Demo
Go to https://out-fkofqpbovh.now.sh see the latest release.  
Add some addresses to keep track of them.

## Dev environment setup

```
npm run dev
```

And point your web browser to http://localhost:3000

## Deploy

```
npm run deploy
```

Will deploy your site to [now.sh](https://zeit.co/now). Every deploy gives you a new url.
