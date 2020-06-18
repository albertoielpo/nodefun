import { Request, Response } from 'express';
import ResponseModel from '../models/ResponseModel';
import QRCode  from 'easyqrcodejs-nodejs';

export class CreateQrService {
  public create(req: Request, res: Response) {
    
    /* info 
     * https://www.npmjs.com/package/easyqrcodejs-nodejs 
     */
    let text = "default";
    let colorDark = "#000000";
    let logo = "sc_logo_round.png";
    if(req.query){
      text = req.query.text ? req.query.text : "default";
      colorDark = req.query.colordark ? ("#" +req.query.colordark) : "#000000";
      logo = req.query.logo ? req.query.logo : "sc_logo_round.png";
    }

    //const QRCode = require('easyqrcodejs-nodejs');

    // Options
    var options = {
      // ====== Basic
      text: text,
      width: 256,
      height: 256,
      colorDark: colorDark,
      //colorDark: "#3e4e62"
      //colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
      dotScale: 1, // Must be greater than 0, less than or equal to 1. default is 1

      // ====== Quiet Zone

      quietZone: 15,
      quietZoneColor: 'white',


      // ====== Logo

      //logo:"../demo/logo.png", // Relative address, relative to `easy.qrcode.min.js`
      logo: "./resources/"+logo,
      logoWidth: 80, // widht. default is automatic width
      logoHeight: 80, // height. default is automatic height
      logoBackgroundColor: '#fffff', // Logo backgroud color, Invalid when `logBgTransparent` is true; default is '#ffffff'
      logoBackgroundTransparent: true, // Whether use transparent image, default is false


      // ====== Backgroud Image
      /*
      backgroundImage: '', // Background Image
      backgroundImageAlpha: 1, // Background image transparency, value between 0 and 1. default is 1. 
      autoColor: false,
      */

      // ====== Colorful
      // === Posotion Pattern(Eye) Color
      /*
      PO: '#e1622f', // Global Posotion Outer color. if not set, the defaut is `colorDark`
      PI: '#aa5b71', // Global Posotion Inner color. if not set, the defaut is `colorDark`
      PO_TL:'', // Posotion Outer color - Top Left 
      PI_TL:'', // Posotion Inner color - Top Left 
      PO_TR:'', // Posotion Outer color - Top Right 
      PI_TR:'', // Posotion Inner color - Top Right 
      PO_BL:'', // Posotion Outer color - Bottom Left 
      PI_BL:'', // Posotion Inner color - Bottom Left 
      */
      // === Alignment Color
      /*
      AO: '', // Alignment Outer. if not set, the defaut is `colorDark`
      AI: '', // Alignment Inner. if not set, the defaut is `colorDark`
      */
      // === Timing Pattern Color
      /*
      timing: '#e1622f', // Global Timing color. if not set, the defaut is `colorDark`
      timing_H: '', // Horizontal timing color
      timing_V: '', // Vertical timing color
      */

      // ====== Title
      /*
      title: 'QR Title', // content 
      titleFont: "bold 18px Arial", //font. default is "bold 16px Arial"
      titleColor: "#004284", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      */

      // ====== SubTitle
      /*
      subTitle: 'QR subTitle', // content
      subTitleFont: "14px Arial", // font. default is "14px Arial"
      subTitleColor: "#004284", // color. default is "4F4F4F"
      subTitleTop: 40, // draws y coordinates. default is 0
      */

      // ===== Event Handler
      /*
      onRenderingStart: undefined,
      */

      // ==== Images format
      /*
      format: 'PNG', // 'PNG', 'JPG'
      compressionLevel: 6, // ZLIB compression level (0-9). default is 6
      quality: 0.75, // An object specifying the quality (0 to 1). default is 0.75. (JPGs only) 
      */

      // ==== Versions
      version: 0 // The symbol versions of QR Code range from Version 1 to Version 40. default 0 means automatically choose the closest version based on the text length.
      
      
    }

    // New instance with options
    var qrcode = new QRCode(options);

    let qrName = new Date().getTime() +'.png';
    qrcode.saveImage({ path: qrName });
    return ResponseModel.sendResponseOk(res, { generatedName: qrName });

  }
}