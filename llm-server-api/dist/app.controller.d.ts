import { AppService } from './app.service';
export declare class InputRequest {
    input: string;
}
export declare class AppResponse {
    content: string;
}
export declare class AppController {
    private readonly appService;
    genAI: any;
    model: any;
    constructor(appService: AppService);
    chat(inputRequest: InputRequest): Promise<AppResponse>;
    spockChat(inputRequest: InputRequest): Promise<AppResponse>;
    benFranklinChat(inputRequest: InputRequest): Promise<AppResponse>;
    robotController(inputRequest: InputRequest): Promise<AppResponse>;
}
