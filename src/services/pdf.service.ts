import { Request, Response } from 'express';
import ResponseModel from '../models/ResponseModel';
import PdfPrinter from 'pdfmake';

export class PdfService {
  public create(req: Request, res: Response) {

    var fonts = {
      Roboto: {
        normal: 'resources/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'resources/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'resources/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'resources/fonts/Roboto/Roboto-MediumItalic.ttf'
      }
    };

    let printer = new PdfPrinter(fonts);

    /* data coming from external service */
    /* first row */
    /**  header left - data */
    let logoImage = 'data:image/png;base64,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';
    /**  header right - data */
    let factoryName = "Avonne";
    let address = "via delle vie, 10, Lomazzo, CO";
    let telephoneNumber = "(+39)0331.610000";
    let email = "email@email.it"

    /** second row */
    let titleLabel = "PARAMETRI DI CONFIGURAZIONE AUTOMAZIONE";

    /** third row */
    /* left block */
    let siteLabel = "Sito:";
    let siteName = "nome sito";
    let siteAddress = "via dei siti, 10, Lomazzo, CO";
    /* right block */
    let automationLabel = "Automazione:";
    let automationName = "nome automazione (installatore)";
    let automationAddress = "via delle automazioni, 10, Lomazzo, CO";

    /* fourth row */
    let customerLabel = "Cliente/Referente:";
    let customerName = "Venturini Consuelo";
    let customerPhoneLabel = "Tel:";
    let customerPhone = "(+39)0331611232";
    let customerEmailLabel = "Email:"
    let customerEmail = "venturini@consuelo.com";

    /* fifth row */
    let configurationLabel = "Dati configurazione:";
    let configurationNameLabel = "Nome configurazione:";
    let configurationName = "Config.GAAA789420";
    let configurationDateLabel = "Data configurazione:";
    let configurationDate = "25/05/2020";
    let automationTypelabel = "Tipologia automazione";
    let automationType = "Gate";
    let controlBoardLabel = "Scheda di controllo:";
    let controlBoard = "Board-5555";
    let fwLabel = "FW:";
    let fw = "ZAW-211";

    /* sixth row - table */
    let idxLabel = "IDX";
    let descParamLabel = "Descrizione parametro";
    let valueParamLabel = "Valore parametro"

    let tableData = [];

    let jj = (new Date()).getTime();

    for(let ii=0; ii<100;ii++,jj+=1000){
      let idxData = (ii+1);
      let descParam  = "descrizione "+ jj.toString(36);
      let valueParam = (Math.random()*100).toFixed(2);
      tableData.push([{ text: idxData, style: 'headerLeft' }, { text: descParam, style: 'headerLeft' }, { text: valueParam, style: 'headerLeft' }]);
    }

    /* template */

    /* table widths (* -> all, auto -> text width, 100=px width) */
    /* border syntax: [left, top, right, bottom] */    
    let borderTop = [true, true, true, false]; 
    let borderMiddle = [true, false, true, false];
    let borderBottom = [true, false, true, true];

    let dd = {
      content: [
        /* first row */
        {
          columns: [
            {
              /* header left - logo */
              margin: [15, 20, 0, 0],
              image: logoImage,
              width: 180
            },
            {
              /* header right */
              margin: [100, 0, 0, 0],
              table: {
                widths: ['*'],
                body: [
                  [{ text: factoryName, border: borderTop, style: 'headerRight' }],
                  [{ text: address, border: borderMiddle, style: 'headerRight' }],
                  [{ text: telephoneNumber, border: borderMiddle, style: 'headerRight' }],
                  [{ text: email, border: borderBottom, style: 'headerRight' }]
                ]
              }
            }
          ]
        },
        /* second row */
        {
          margin: [0, 30, 0, 0],
          columns: [{ text: titleLabel, style: "headerTitle" }]          
        },
        /* third row */
        {
          margin: [0, 30, 0, 0],
          columns: [
            {
              table: {
                widths: [220],
                body: [
                  [{ text: siteLabel, border: borderTop, style: 'headerBoldLeft' }],
                  [{ text: siteName, border: borderMiddle, style: 'headerLeft' }],
                  [{ text: siteAddress, border: borderBottom, style: 'headerLeft' }]
                ]
              }
            },
            {
              margin: [23, 0, 0, 0],
              table: {
                widths: ['*'],
                body: [
                  [{ text: automationLabel, border: borderTop, style: 'headerBoldLeft' }],
                  [{ text: automationName, border: borderMiddle, style: 'headerLeft' }],
                  [{ text: automationAddress, border: borderBottom, style: 'headerLeft' }]
                ]
              }
            }
          ]
        },
        /* fourth row */
        {
          margin: [0, 10, 0, 0],
          columns: [{ 
            table: {
              widths: ["*"],
              body: [
                [{ text: customerLabel, border: borderTop, style: 'headerBoldLeft' }],
                [{
                  border: borderBottom,
                  columns : [
                    {text: customerName, style: 'headerLeft' },
                    {text: customerPhoneLabel + " " + customerPhone, style: 'headerLeft' },
                    {text: customerEmailLabel + " " + customerEmail, style: 'headerLeft' }
                  ]
                }]
              ]
            }
          }]
        },
        /* fifth row */
        {
          margin: [0, 10, 0, 0],
          columns: [{ 
            table: {
              widths: ["*"],
              body: [
                [{ text: configurationLabel, border: borderTop, style: 'headerBoldLeft' }],
                [{
                  border: borderMiddle,
                  columns : [
                    {text: configurationNameLabel + " "+ configurationName, style: 'headerLeft' },
                    {text: configurationDateLabel + " "+ configurationDate, style: 'headerLeft' }
                  ]
                }],
                [{
                  border: borderBottom,
                  columns : [
                    {text: automationTypelabel + " "+ automationType, style: 'headerLeft' },
                    {text: controlBoardLabel + " "+ controlBoard, style: 'headerLeft' },
                    {text: fwLabel + " "+ fw, style: 'headerLeft' }
                  ]
                }]
              ]
            }
          }]
        },
        /* sixth row */
        {
          margin: [0, 10, 0, 0],
          columns: [{ 
            table: {
              headerRows: 1,
              widths: [50,"*",150],
              body: [
                [{ text: idxLabel, style: 'headerBoldLeft' }, { text: descParamLabel, style: 'headerBoldLeft' }, { text: valueParamLabel, style: 'headerBoldLeft' }],
                ...tableData
              ]
            }
          }]
        }
      ],
      styles: {
        headerBase: {fontSize: 11, italics: false },
        headerLeft: {fontSize: 10, italics: false, bold: false, alignment: 'left' },
        headerLeftGrey: {fontSize: 11, italics: false, bold: false, alignment: 'left', color: 'grey' },
        headerRight: {fontSize: 10, italics: false, bold: false, alignment: 'right' },
        headerRightGrey: {fontSize: 11, italics: false, bold: false, alignment: 'right', color: 'grey' },
        headerBoldLeft: {fontSize: 11, italics: false, bold: true, alignment: 'left' },
        headerBoldRight: {fontSize: 11, italics: false, bold: true, alignment: 'right' },        
        headerTitle: {fontSize: 14, bold: true, alignment: 'center'}
      }
    };

    let pdfDoc = printer.createPdfKitDocument(dd);
    let chunks = []
    let result;

    pdfDoc.on('data', function (chunk) {
      chunks.push(chunk)
    });
    pdfDoc.on('end', function () {
      result = Buffer.concat(chunks);
      res.contentType('application/pdf')
      res.send(result)
    });
    pdfDoc.end();
  }
}