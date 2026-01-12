export class InvalidReportSizeError extends Error{
    constructor(message = "Invalid report size") {
        super(message);
        this.name = "InvalidReportSizeError";
    }
}