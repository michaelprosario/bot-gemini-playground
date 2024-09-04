import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IChatCommand, IChatResponse } from "../core/chat-view-interfaces";
import { IChatService } from "../core/IChatService";


@Injectable()
export class SpockChatService implements IChatService {
    private chatUrl: string = '/app/spockChat';
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async executeChatCommand(message: IChatCommand): Promise<IChatResponse> {
        return await this.httpClient.post(this.chatUrl, message).toPromise() as IChatResponse;
    }
}
