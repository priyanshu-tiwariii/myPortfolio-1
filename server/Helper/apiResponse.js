class apiResponse{
    constructor(status,data,message='success',){
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = status >= 200 && status < 400;
        this.error = status >= 400;
    }
}
export default apiResponse;