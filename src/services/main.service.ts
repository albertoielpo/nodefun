import { Request, Response } from 'express';
import ResponseModel from '../models/ResponseModel';
import * as moment from 'moment-timezone';

export class MainService {
  public version(req: Request, res: Response) {
    const pac = require('../../package.json');

    const b = moment.tz.zonesForCountry('IT');
    console.log(b);
    console.log(b[0]);
    return ResponseModel.sendResponseOk(res, { version: pac.version });
  }
}