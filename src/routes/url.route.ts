import { Router } from 'express';
import UrlController from '../controllers/url.controller';
import Route from '../interfaces/routes.interface';
import { validationParamsMiddleware, validationMiddleware } from '../middlewares/validation.middleware';
import * as dto from '../dtos/url.dto';

class UrlRoute implements Route {
  public path = '/url';

  public router = Router();

  public urlController = new UrlController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, validationMiddleware(dto.CreateUrlDto), this.urlController.createUrl);
    this.router.get(`${this.path}/:url`, validationParamsMiddleware(dto.UrlViewDto), this.urlController.shutUrlView);
  }
}

export default UrlRoute;
