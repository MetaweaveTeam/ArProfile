

# Arweave Account: your identity on the [permaweb](https://arweave.org).

Permanent, decentralized, owned by you.

[Visit the permadapp](https://account.metaweave.xyz)

## Inspiration

As our wallets are our identity on the web 3, It becomes necessary to be able to recognize each other with human friendly features such as an avatar, a nickname and a unique handle.

## What it does

You can log in with either, ArConnect, arweave.app or Bundlr with $MATIC. Once connected, the app look for the latest transaction from your wallet with the tag `Protocol-Name: Account-<version>` and displays your profile according to what has been stored in there.
Then, you can click on "Edit Profile" to update it click on "save" to store it on arweave.

Account comes with a handy npm package `arweave-account` which makes easy for other applications to get the user profile from their wallet address or search for an user handle name.

## What's next for Account

- polish it up and fix the details: having an Alert pop-up to tell the user to wait for miners to confirm their tx is ugly
- Extend Account for specific permadapps to add custom entries along with the common profile data.
- Integrate Account on Metaweave.

# Getting Started

```
$ npm i
$ npm start
```

# Deploy permanently

```
$ npm run build
$ npx arweave-deploy deploy build/static/js/main.<id>.js --package --key-file <key file path>
```

- Copy/paste the deployed javascript file link to the <script> tag in `/build/index.html`
- In `/build/index.html` move the <script> tag from <head> in <body> at the end

```
$ npx arweave-deploy deploy build/index.html --package --key-file <your key file>
```

Voilà
