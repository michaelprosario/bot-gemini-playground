import { HttpClient } from "@angular/common/http";
import { IChatCommand, IChatResponse } from "./chat-view-interfaces";
import { Injectable } from "@angular/core";

export interface IChatService
{
    executeChatCommand(message: IChatCommand): Promise<IChatResponse>;
}

@Injectable()
export class BenFranklinChatService implements IChatService
{
    private benFrankLinChatUrl: string = '/app/benFranklinChat';
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient)
    {
        this.httpClient = httpClient;
    }

    async executeChatCommand(message: IChatCommand) : Promise<IChatResponse>
    {
        return await this.httpClient.post(this.benFrankLinChatUrl, message).toPromise() as IChatResponse;
    }
}
   
@Injectable()
export class SpockChatService implements IChatService
{
    private benFrankLinChatUrl: string = '/app/spockChat';
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient)
    {
        this.httpClient = httpClient;
    }

    async executeChatCommand(message: IChatCommand) : Promise<IChatResponse>
    {
        return await this.httpClient.post(this.benFrankLinChatUrl, message).toPromise() as IChatResponse;
    }
}
