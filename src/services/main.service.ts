import { Request, Response } from 'express';
import ResponseModel from '../models/ResponseModel';
import * as moment from 'moment-timezone';

export class MainService {
  /**
   * 
   * @param req 
   * @param res 
   */
  public version(req: Request, res: Response) {
    const pac = require('../../package.json');
    return ResponseModel.sendResponseOk(res, { version: pac.version });
  }

  /**
   * 
   * @param req 
   * @param res 
   */
  public momentTimezone(req: Request, res: Response){
    const moments = [];

    ['IT','US','NZ'].forEach(c => {
      const zones = moment.tz.zonesForCountry(c);
      for(const zone of zones){
        const timenow = moment.tz(zone).format();
        moments.push({zone: zone, time: timenow, country: c})
      }      
    })

    const utc = moment.tz().utc();
    moments.push({time:utc, zone: "UTC"})

    return ResponseModel.sendResponseOk(res, { moments: moments });
  }

}