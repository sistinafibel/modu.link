import { Router } from 'express';
import TestController from '../controllers/test.controller';
import Route from '../interfaces/routes.interface';

class UrlRoute implements Route {
  public path = '';

  public router = Router();

  public testController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.testController.testOrm); // 회원가입
  }
}

export default UrlRoute;
