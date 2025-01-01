//Repo: step3.2
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
    constructor(message = "Validation failed") {
        super(message, 400);
    }
}