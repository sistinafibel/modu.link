import { NextFunction, Request, Response } from 'express';
import { UrlList } from '../entity/test.entity';
import { CreateUrlDto } from '../dtos/url.dto';

class UrlController {
  /**
   * 랜덤 링크 생성
   * @param req
   * @param res
   * @param next
   */
  public createUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bodyData: CreateUrlDto = req.body;
    const urlList = new UrlList();
    const timestamp = Number(String(Math.floor(Math.random() * 10)) + String(new Date().getTime()));

    urlList.fullUrl = bodyData.url;
    urlList.shutUrl = timestamp.toString(32);

    await urlList.save();
    res.status(200).json({ url: urlList.fullUrl, shutUrl: urlList.shutUrl });
  };

  /**
   * 랜덤 링크 조회
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public viewUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paramUrl = req.params.url;
      const urlInfo = await UrlList.findOne({ shutUrl: paramUrl });
      if (!urlInfo) {
        res.status(404).json({ test: 'asdasdeeor' });
        return;
      }

      res.status(301).redirect(urlInfo.fullUrl);
    } catch (error) {
      next(error);
    }
  };
}

export default UrlController;
