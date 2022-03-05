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
