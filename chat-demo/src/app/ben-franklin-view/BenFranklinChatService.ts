import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IChatCommand, IChatResponse } from "../core/chat-view-interfaces";
import { IChatService } from "../core/IChatService";


@Injectable()
export class BenFranklinChatService implements IChatService {
    private benFrankLinChatUrl: string = '/app/benFranklinChat';
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async executeChatCommand(message: IChatCommand): Promise<IChatResponse> {
        return await this.httpClient.post(this.benFrankLinChatUrl, message).toPromise() as IChatResponse;
    }
}
