//Repo: step3.1
export class BaseError extends Error {                          //Error is the base class for all errors in js                    
    public statusCode: number;                                  //http statusCode
    
    constructor(message: string, statusCode: number){
        super(message);                                         //calls Error(message) - built in j class
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);      //ensure instance of will work as expected
    }

}