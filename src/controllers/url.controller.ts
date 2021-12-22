import { NextFunction, Request, Response } from 'express';
import { CreateUrlDto } from '../dtos/url.dto';
import ContactUsService from '../services/url.service';
import HttpException from '../exceptions/HttpException';
import { UrlMessage } from '../message/url.message';

class UrlController {
  private contactUsService = new ContactUsService();

  /**
   * 랜덤 링크 생성
   * @param req
   * @param res
   * @param next
   */
  public createUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bodyData: CreateUrlDto = req.body;
      const urlInfo = await this.contactUsService.createUrl(bodyData);

      res.status(200).json(urlInfo);
    } catch (error) {
      next(error);
    }
  };

  /**
   * 랜덤 링크 조회
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public shutUrlView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paramUrl = req.params.url;
      const urlUrl = await this.contactUsService.shutUrlView(paramUrl);
      if (!urlUrl) throw new HttpException(404, UrlMessage.NULL_URL);

      res.status(301).redirect(urlUrl.fullUrl);
    } catch (error) {
      next(error);
    }
  };
}

export default UrlController;
