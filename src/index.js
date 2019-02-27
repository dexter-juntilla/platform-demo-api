import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import routes from './router';

const app = express();
const port = 8083;

app.use(cors());

routes(app);

if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.info('listening at %s', port);
  });
} else {
  exports.app = functions.https.onRequest(app);
}
