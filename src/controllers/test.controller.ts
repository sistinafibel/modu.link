import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/test.entity';

import * as cRes from '../utils/customrender';

class TestController {
  public testOrm = async (req: Request, res: Response, next: NextFunction) => {
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.isActive = true;
    user.date = new Date();
    await user.save();

    // await user.remove();
    const users = await User.find({ skip: 2, take: 5 });

    cRes.sendJson(res, users);
  };
}

export default TestController;
