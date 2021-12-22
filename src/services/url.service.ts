import { UrlList } from '../entity/url.entity';
import { CreateUrlDto } from '../dtos/url.dto';
import HttpException from '../exceptions/HttpException';
import { UrlMessage } from '../message/url.message';

class ContactUsService {
  private urlList = new UrlList();

  public async createUrl(bodyData: CreateUrlDto) {
    // 이미 있는 URL 인지 확인하기
    let infoUrl: UrlList;
    let shutUrl: string;

    if (bodyData.type === 1) {
      infoUrl = await this.fullUrlView(bodyData.customUrl);
      if (infoUrl) throw new HttpException(409, UrlMessage.UNSUITABLE_URL);

      shutUrl = bodyData.customUrl;
    } else {
      infoUrl = await this.shutUrlView(bodyData.url);
      if (infoUrl) shutUrl = infoUrl.shutUrl;
      else {
        const timestamp = Number(String(Math.floor(Math.random() * 10)) + String(new Date().getTime()));
        shutUrl = timestamp.toString(32);
      }
    }

    this.urlList.fullUrl = bodyData.url;
    this.urlList.shutUrl = shutUrl;

    await this.urlList.save();

    return {
      fullUrl: this.urlList.fullUrl,
      shutUrl: this.urlList.shutUrl,
    };
  }

  public async shutUrlView(paramUrl: string) {
    const urlInfo = await UrlList.findOne({ shutUrl: paramUrl });
    return urlInfo;
  }

  public async fullUrlView(paramUrl: string) {
    const urlInfo = await UrlList.findOne({ fullUrl: paramUrl });
    return urlInfo;
  }
}

export default ContactUsService;
