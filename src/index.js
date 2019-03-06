import '@babel/polyfill';
import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import firebase from 'firebase';
import admin from 'firebase-admin';
import routes from './router';

import serviceAccount from '../config/serviceAccountKey.json';
import firebaseCredentials from '../config/firebaseCredentials.json';

const app = express();
const port = 8083;

firebase.initializeApp(firebaseCredentials);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://platform-demo-9e004.firebaseio.com',
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser());

// cross origin resource sharing
app.use(cors());

routes(app, firebase, admin);

if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.info('listening at %s', port);
  });
} else {
  exports.app = functions.https.onRequest(app);
}
