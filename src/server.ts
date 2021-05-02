/* eslint-disable prettier/prettier */
import 'dotenv/config';
import App from './app';
import TestRoute from './routes/test.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new TestRoute()
]);

app.listen();
