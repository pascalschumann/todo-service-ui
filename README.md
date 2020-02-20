# Todo service UI

## Deployment (dev)


* Install nvm (Node version manager)
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
```
* Install latest lts node
```bash
nvm install latest
nvm use <printed version>
```

* Install dependencies locally
```bash
npm install
```
* Run app in dev mode with auto reload and lint errors
```bash
npm start
```
[http://localhost:3000](http://localhost:3000)
* Run tests in the interactive watch mode
```bash
npm test 
```
* Build production (minified and file names contains its file hash)
```bash
npm run build
```

## Resources

* [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
* [Running tests](https://facebook.github.io/create-react-app/docs/running-tests)
* [React Getting Started](https://facebook.github.io/create-react-app/docs/getting-started).
* [React documentation](https://reactjs.org/).
