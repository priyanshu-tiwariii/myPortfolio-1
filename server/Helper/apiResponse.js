class apiResponse{
    constructor(data,message='success',status){
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status >= 200 && status < 400;
        this.error = status >= 400;
    }
}
export default apiResponse;