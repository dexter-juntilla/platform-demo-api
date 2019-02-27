# Firebase Functions API Platform

jump start your firebase functions project

## Getting Started

### Prerequisites

- NodeJS v8+
- Global node modules
  - firebase-tools
- recommended (optional)
  - nvm (to install multiple node versions)

### Installing

A step by step series of examples that tell you how to get a development env running

- clone repo
- `npm install`
- `firebase login`
- `firebase init`
- pick Functions and other needed features by pressing space
- press enter
- choose your project
- choose JavaScript
- Do you want to use ESLint to catch probable bugs and enforce style? (y/N) y
- Do you want to install dependencies with npm now? (Y/n) y
- install firebase-\* modules to ./package.json; see generated ./function/package.json for specific version to install

### run locally using nodemon

- `npm start`

### run locally using firebase serve

- transpile babel code to node js code: `npm run babel`
- `cd functions`
- install modules if needed: `npm install`
- must be assigned to active project; if not assigned to project,
- `firebase use --add my-project-name-from-firebase-console`
- run firebase server: `npm run serve`

### deploy

- `npm run deploy`

### notes:

- modules installed in project root should also be installed in firebase folder

### logging

- `console.log()` should only be used in development. Eslint will block you from committng changes if it finds console.log()
- `console.info()` info you want to log to firebase logging(e.g., route, request body, response, etc.).
- `console.warn()` client errors, 4xx errors(e.g. 400 Bad Request, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, etc.).
- `console.error()` 5xx server errors(e.g., 500 Internal Server Error, etc.).
