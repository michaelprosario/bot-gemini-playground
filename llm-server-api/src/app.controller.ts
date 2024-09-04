import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class ContentItem {
  @ApiProperty()
  role: string;

  @ApiProperty()
  parts: ContentItemPart[];
}

export class ContentItemPart {
  @ApiProperty()
  text: string;
}

export class InputRequest {
  @ApiProperty()
  input: string;

  @ApiProperty()
  contentItems: ContentItem[];
}

export class AppResponse {
  @ApiProperty()
  content: string;
}

@Controller('app')
export class AppController {
  genAI: any;
  model: any;
  constructor(private readonly appService: AppService) {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  @Post('chat1')
  async chat(@Body() inputRequest: InputRequest): Promise<AppResponse> {
    const response = new AppResponse();
    response.content = inputRequest.input;

    const prompt = inputRequest.input;

    const result = await this.model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }

  @Post('spockChat')
  async spockChat(@Body() inputRequest: InputRequest): Promise<AppResponse> {
    const response = new AppResponse();
    response.content = inputRequest.input;

    // amend this prompt so that gemini llm acts as Spock from Star Trek
    const prompt = `Respond as Mr. Spock from Star Trek. Be logical, concise, and avoid emotional responses. Use formal language and reference Vulcan philosophy when appropriate. Limit responses to 5 sentences. User input: ${inputRequest.input}`;

    const result = await this.model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }

  @Post('benFranklinChat')
  async benFranklinChat(
    @Body() inputRequest: InputRequest,
  ): Promise<AppResponse> {
    const response = new AppResponse();
    response.content = inputRequest.input;
    const prompt = `Respond as Ben Franklin. Limit responses to 7 sentences. User input: ${inputRequest.input}`;

    const result = await this.model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }

  @Post('marketingAdvisorChat')
  async marketingAdvisorChat(
    @Body() inputRequest: InputRequest,
  ): Promise<AppResponse> {
    const response = new AppResponse();
    response.content = inputRequest.input;
    const prompt = `Respond as marketing advisor. Respond in paragraph form.  User input: ${inputRequest.input}`;

    // create a content item for our prompt
    const systemContentItem: ContentItem = {
      role: 'model',
      parts: [{ text: prompt }],
    };

    // add the prompt to the content items as the first time
    inputRequest.contentItems.unshift(systemContentItem);

    const result = await this.model.generateContent({
      contents: inputRequest.contentItems,
    });
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }

  @Post('robotController')
  async robotController(
    @Body() inputRequest: InputRequest,
  ): Promise<AppResponse> {
    const response = new AppResponse();
    response.content = inputRequest.input;
    const prompt = `
    As a robot control system, I need you to listen for the following commands:
    - When asked to move forward, say FORWARD and the number if provided
    - When asked to move backward, say BACKWARD"  and the number if provided
    - When asked to turn left or something similar, say TURN_LEFT
    - When asked to turn right or something similar, say TURN_RIGHT
    - Report ERROR if every other case.

    Focus on this scope.  
    User input: ${inputRequest.input}
    `;

    const result = await this.model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }
}
