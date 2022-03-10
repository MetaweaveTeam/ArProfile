# About

## Inspiration

As our wallets are our identity on the web 3, It becomes necessary to be able to recognize each other with human friendly features such as an avatar, a nickname and a unique handle. Verto ID is a way to do that but it meets scalability issues. On the other side, arweave-id is interesting but its features are limited (no avatar) and the current UI doesn't aim to integrate the latest wallet clients.
Account is a definitive protocol on arweave that aim to combine the best of both worlds.

## What it does

You can log in with either, ArConnect, arweave.app or Bundlr with $MATIC. Once connected, the app look for the latest transaction from your wallet with the tag `Protocol-Name: Account-<version>` and displays your profile according to what has been stored in there.
Then, you can click on "Edit Profile" to update it click on "save" to store it on arweave.

Account comes with a handy npm package `arweave-account` which makes easy for other applications to get the user profile from their wallet address or search for an user handle name.

## How I built it

Account is a simple react app (create-react-app) with typescript that is designed to be deployed and used on the permaweb

## Challenges I ran into

Since `react-script` version 5, polyfills are no longer included, I had to override the webpack configuration and find out solutions on Bundlr's discord.

Sometime, the gateway is not able to retrieve transactions made with Bundlr, either by txid, or by tags.

## Accomplishments that I'm proud of

I wanted the application to perform the same feature (create/edit profile via the same formated transaction) while being compatible with multiple wallet clients. I ended up making an interface for to connect, disconnect and write that includes Bundlr, ArConnect and arweave.app and it is a relatively reusable code that could help other developers to integrate it in their app. 

## What I learned

I learned how to use Buidlr network.

## What's next for Account

- Add the avatar upload
- Finish `arweave-account` library
- Integrate Account on Metaweave.xyz
- Extend Account for specific permadapps to add custom entries along with the common profile data

# Getting Started

`
$ npm i
$ npm start
`

# Deploy permanently

`
$ npm run build
$ npx arweave-deploy deploy build/static/js/main.<id>.js --package --key-file <key file path>
`

- Copy/paste the deployed javascript file link to the <script> tag in `/build/index.html`
- In `/build/index.html` move the <script> tag from <head> in <body> at the end

`
$ npx arweave-deploy deploy build/index.html --package --key-file <your key file>
`

Voilà
