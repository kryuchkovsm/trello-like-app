# Trello clone learning app

Education project, assigned to learn skills in node.js, angular 2 and web technologies e.t.c.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[MongoDB v2.4.9](https://docs.mongodb.com/manual/installation/) running on localhost at port: 27017

[npm v4.2.0+](https://nodejs.org/en/download/package-manager/)

[node.js v5.11.1+](https://nodejs.org/en/download/package-manager/)

Globally installed [typescript compiller 2.1.6](https://www.typescriptlang.org/) or later
```
npm install -g typescript
```

### Installing

Clone app from bitbucket repo:
```
git clone https://dunice-kryuchkov@bitbucket.org/dunice-kryuchkov/trello-like-app.git
```

Go to app directory, and install packages for node.js server

```
cd trello-like-app
npm install
```

Go to client folder, and install angular2 packages
```
cd client
npm install
```

Compile angular 2 application.

```
tsc
```

## Deployment

Go to home directory 'trello-like-app', and run server
```
cd ..
node server.js
```

Open your browser on page 'localhost:3000'


## Authors

* **Sergey Kryuchkov** - *Initial work* 

## License

This project is licensed under the MIT License.

