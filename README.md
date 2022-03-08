# About

## Inspiration

As our wallets are our identity on the web 3, It becomes necessary to be able to recognize each other with human friendly things such as an avatar, a nickname and a unique handle. Verto ID is a way to do that but it meets scalability issues. On the other hand, arweave-id is interesting but its features are limited while the  

## What it does

You can log in with either, ArConnect, arweave.app or Bundlr with $MATIC. Once connected, the app look for the latest transaction from your wallet with the tag `Protocol-Name: Account-<version>` and displays your profile according to what has been stored in there.
Then, you can click on "Edit Profile" to update it click on "save" to store it on arweave.

Account comes with a handy npm package `arweave-account` which makes easy for other applications to get the user profile from their wallet address or search for an user handle name.

## How I built it

`$ create-react-app account --template typescript`

## Challenges I ran into

Since `react-script` version 5, polyfills are no longer included, I had to override the webpack configuration and find out solutions on Bundlr's discord.

## Accomplishments that I'm proud of



## What I learned



## What's next for Account




# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
