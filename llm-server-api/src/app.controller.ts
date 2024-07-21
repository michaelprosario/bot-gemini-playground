import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export class InputRequest {
  @ApiProperty()
  input: string;
}

export class AppResponse {
  @ApiProperty()
  content: string;
}

@Controller('app')
export class AppController {
  genAI: any;
  model: any;
  constructor(private readonly appService: AppService) 
  {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  }

  @Post('chat1')
  async create(@Body() inputRequest: InputRequest) : Promise<AppResponse> {
    let response = new AppResponse();
    response.content = inputRequest.input;

    const prompt = inputRequest.input;

    const result = await this.model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }   
}
