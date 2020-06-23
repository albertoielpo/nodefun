import { MainService } from "../services/main.service";
import { RoutePath } from "../constants/route.constants";
import { CreateQrService } from "../services/createQr.service";
import { PdfService } from "../services/pdf.service";

export class MainController {
  private mainService: MainService;
  private createQrService:CreateQrService;
  private pdfService:PdfService;

  constructor(private app: any) {
    this.mainService = new MainService();
    this.createQrService = new CreateQrService();
    this.pdfService = new PdfService();
    this.routes();
  }

  public routes() {
    
    /* default */
    this.app.route(RoutePath.home).get(this.mainService.version);
    console.log(`route created ${RoutePath.home}`);
    
    /* create qr */
    this.app.route(RoutePath.createQr).get(this.createQrService.create);
    console.log(`route created ${RoutePath.createQr}`);

    /* create pdf */
    this.app.route(RoutePath.createPdf).get(this.pdfService.create);
    console.log(`route created ${RoutePath.createPdf}`);

  }
}