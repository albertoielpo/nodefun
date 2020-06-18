class ResponseModel {

    constructor() {

    }

    /**
     * Send response as JSON object
     * @param response 
     * @param code 
     * @param payload 
     */
    public static sendResponse(response: any, code: number, payload: any): void {
        let res = {data: payload};
        response.status(code);
        response.json(res);
    }

    /**
     * 
     * @param response 
     * @param payload 
     */
    public static sendResponseOk(response: any, payload: any): void {
        ResponseModel.sendResponse(response, 200, payload);
    }

    /**
     * 
     * @param response 
     * @param payload 
     */
    public static sendBadRequest(response: any, payload: any): void {
        ResponseModel.sendResponse(response, 400, payload);
    }

    /**
     * 
     * @param response 
     * @param payload 
     */
    public static sendMethodNotAllowed(response: any, payload: any): void {
        ResponseModel.sendResponse(response, 405, payload);
    }

    /**
     * 
     * @param response 
     * @param payload 
     */
    public static sendUnAuthorized(response: any, payload: any): void {
        ResponseModel.sendResponse(response, 401, payload);
    }

    /**
     * 
     * @param response 
     * @param payload 
     */
    public static sendNotfound(response: any, payload: any): void {
        ResponseModel.sendResponse(response, 404, payload);
    }

    /**
     * 
     * @param response 
     * @param payload 
     */
    public static sendInternalServerError(response: any, payload: any): void {
        ResponseModel.sendResponse(response, 500, payload);
    }


}
export = ResponseModel;