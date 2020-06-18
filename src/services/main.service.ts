import { Request, Response } from 'express';
import ResponseModel from '../models/ResponseModel';

export class MainService {
  public version(req: Request, res: Response) {
    const pac = require('../../package.json');
    return ResponseModel.sendResponseOk(res, { version: pac.version });
  }
}