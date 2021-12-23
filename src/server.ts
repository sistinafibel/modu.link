/* eslint-disable prettier/prettier */
import 'dotenv/config';
import App from './app';
import UrlRoute from './routes/url.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new UrlRoute()
]);

app.listen();
