import { UrlList } from '../entity/url.entity';
import { CreateUrlDto } from '../dtos/url.dto';
import HttpException from '../exceptions/HttpException';

class ContactUsService {
  private urlList = new UrlList();

  public async createUrl(bodyData: CreateUrlDto) {
    const timestamp = Number(String(Math.floor(Math.random() * 10)) + String(new Date().getTime()));

    this.urlList.fullUrl = bodyData.url;
    this.urlList.shutUrl = timestamp.toString(32);

    await this.urlList.save();

    return {
      fullUrl: this.urlList.fullUrl,
      shutUrl: this.urlList.shutUrl,
    };
  }

  public async viewUrl(paramUrl: string) {
    const urlInfo = await UrlList.findOne({ shutUrl: paramUrl });
    if (!urlInfo) throw new HttpException(404, '없는 URL 입니다.');
    return urlInfo;
  }
}

export default ContactUsService;
