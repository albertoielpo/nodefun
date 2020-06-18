import { MainService } from "../services/main.service";
import { RoutePath } from "../constants/route.constants";
import { CreateQrService } from "../services/createQr.service";

export class MainController {
  private mainService: MainService;
  private createQrService:CreateQrService;

  constructor(private app: any) {
    this.mainService = new MainService();
    this.createQrService = new CreateQrService();
    this.routes();
  }

  public routes() {
    
    /* default */
    this.app.route(RoutePath.home).get(this.mainService.version);
    console.log(`route created ${RoutePath.home}`);
    
    /* create qr */
    this.app.route(RoutePath.createQr).get(this.createQrService.create);
    console.log(`route created ${RoutePath.createQr}`);

  }
}