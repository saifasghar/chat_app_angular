export class ApiResponse<model> {
    success: boolean;
    message: string;
    data: model;
    status: number;
}