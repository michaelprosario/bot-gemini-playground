import { IChatCommand, IChatResponse } from "./chat-view-interfaces";


export interface IChatService {
    executeChatCommand(message: IChatCommand): Promise<IChatResponse>;
}
