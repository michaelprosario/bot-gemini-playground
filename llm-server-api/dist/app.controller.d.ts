import { AppService } from './app.service';
export declare class InputRequest {
    input: string;
}
export declare class AppResponse {
    content: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    create(inputRequest: InputRequest): Promise<AppResponse>;
}
