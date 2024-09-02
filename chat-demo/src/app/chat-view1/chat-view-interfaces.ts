export interface IMessage {
  sender: string;
  content: string;
  time: string;
}
export interface IChatCommand {
  input: string;
}
export interface IChatResponse {
  content: string;
}
