import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import { createConnection } from 'typeorm';
import { info, error, logger } from './utils/logger';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { dbConnection } from './database/typeorm.db';
import { log } from './utils/systemlogger';

class App {
  public app: express.Application;

  public port: string | number;

  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeEJS();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      log(`🚀 App listening on the port ${this.port}`, true);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection)
      .then(connection => {
        log(`DB에 정상적으로 연결되었습니다 (TypeORM)`, true);
      })
      .catch(error => {
        log(error);
        log(`DB 연결에 실패했습니다. (TypeORM)`, true);
      });
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
      // this.app.use(cors({ origin: true, credentials: true }));
    } else {
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(morgan('combined', { stream: info, skip: (req, res) => res.statusCode >= 500 })); // 전체 로그 수집
    this.app.use(morgan('combined', { stream: error, skip: (req, res) => res.statusCode < 500 })); // ERROR만 로그 등록
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public initializeEJS(): void {
    this.app.use('/css', express.static(`${__dirname}/front/commons/css`));
    this.app.use('/js', express.static(`${__dirname}/front/commons/js`));
    this.app.set('views', path.join(`${__dirname}`, '/front/view'));
    this.app.set('view engine', 'ejs');
  }

  private initializeRoutes(routes: Routes[]) {
    this.app.use('/uploads', express.static(`${__dirname}/uploads`));

    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
