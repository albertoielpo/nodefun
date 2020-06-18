import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MainController } from "./controller/main.controller";


class App {
  public app: any;
  public mainController: MainController;

  constructor() {
    this.app = express();
    this.baseConfig();

    this.mainController = new MainController(this.app);
  }

  private baseConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));    
    this.app.use(cors());
  }

}

export default new App().app;