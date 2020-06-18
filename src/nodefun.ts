import app from "./app";
import http from 'http';  /* debug */

import { HTTP_PORT } from './constants/app.constants';

var serverHttp = http.createServer(app);
serverHttp.listen(HTTP_PORT, () => {
  console.log("server started in http mode on port : " + HTTP_PORT)
});


