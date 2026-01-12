export interface IReportService{
    generateAndSend(email: string, n: number): void;
}