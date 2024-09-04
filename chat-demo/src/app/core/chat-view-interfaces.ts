
export class ContentItem {
  role: string = '';

  parts: ContentItemPart[] = [];
}

export class ContentItemPart {
  text: string = '';
}

export interface IMessage {
  sender: string;
  content: string;
  time: string;
}
export interface IChatCommand {
  input: string;

  contentItems: ContentItem[];
}
export interface IChatResponse {
  content: string;
}
