Like many technology geeks, I continue to value the vision of Star Trek.   The show explores the ideas that humanity worked to overcome our various conflicts, vices and dark times in history.   Rising above these conflicts, humanity worked to become space explorers.  In the Star Trek vision, humanity seeks out “new life and new civilizations” and boldly goes where no one has gone before.   The Vulcan character, Spock, has become the iconic character of the Star Trek universe.   The writers of Star Trek use the character of Spock to explore various flavors of the human state.   Since Spock is both human and Vulcan, the story explores his tension between these very different cultures.   

Sci Fi also paints the vision that mankind will someday interact with AI agents.   In some episodes of Star Trek, the team meet AI characters living out stories of major historical characters.   In other flavors of Sci Fi, visionary authors explore the idea that AI agents may take on a life of their own. 

In 2024, the software industry and major players in GenAI have explored the idea of making these AI agents a reality.  (from a language point of view)   A few months ago, I became curious about NestJS and blending it with Google’s Gemini API.  As a full stack Angular developer, I have appreciated the craftsmanship of NestJS.  NestJS provides an opinionated framework for NodeJs backend development that feels a lot like Angular.  NestJS has a lot of “batteries included” sort of features.  In this post, we’ll explore building an API to chat with an AI Spock. 

The Gemini API allows you to interact with Google’s foundational models for AI applications. You can use it to generate text, translate languages, and summarize text.  It also features image generation and a context window in the millions.   

- Setup NestJs API base: Following the “first steps” tutorial from the NestJs documentation, you can generate your base application - [First steps | NestJS](https://docs.nestjs.com/first-steps)
- Setup OpenApi for your NestJS project: OpenAPI, also known as Swagger, is a specification for describing RESTful APIs. It provides a standard format for documenting APIs, which can be used by developers and tools to understand how to interact with the API.  The documentation pages also enable you to test drive the API’s.   Using the NestJs documentation, I recommend adding OpenAPI to your project - [OpenAPI (Swagger) | NestJS](https://docs.nestjs.com/openapi/introduction)
- To keep this blog post simple, we will simply make edits to the application controller located here:/src/app.controller.ts

### Make data transfer objects

``` typescript
export class ContentItem {
  @ApiProperty()
  role: string;  // user or model

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
```

- AppResponse: This object returns text content back to the user
- InputRequest: This object represents the chat input to the system.  In the most simple cases, the client program can send over a string using the input property.  In more robust applications, the Gemini API enables the client program to send over the full history of the conversion.  During a human conversation, we often refer to previous context as we explore ideas.   The content item collection enables client developers to have full control over the context history.
- ContentItem: This object represents a single statement in a chat.  The role property is either user or model. The client programmer can send over the text using the parts attribute.

### Setup Gemini API
- In your NestJs project folder, install the Gemini API: npm install @google/generative-ai

- Obtain Gemini api key here: https://ai.google.dev/aistudio
- The following environment variable will be used by the Gemini API.
```
export GOOGLE_API_KEY="YOUR KEY GOES HERE"
```

- Import the Gemini API using an import statement at the top of your application controller.
```
import { GoogleGenerativeAI } from '@google/generative-ai';
```

- In the constructor of the app.controller.ts, setup the Gemini API service.

``` typescript
@Controller('app')
export class AppController {
  genAI: any;
  model: any;
  constructor(private readonly appService: AppService) {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
```
In the code above, we need leverage the GOOGLE_API_KEY environment variable to construct a gemini-1.5-flash model.
In a more refined solution, I would recommend wrapping the Gemini API in a NestJS service that you design.   Using this service, you can inject the service into this controller.  For simplicity, we'll continue using the raw Gemini API.

### Setup Spock API

Let's add a controller method to respond as Spock.

``` typescript 
  @Post('spockChat')
  async spockChat(@Body() inputRequest: InputRequest): Promise<AppResponse> {
    const response = new AppResponse();
    response.content = inputRequest.input;

    const prompt = `Respond as Mr. Spock from Star Trek. Be logical, concise, and avoid emotional responses. Use formal language and reference Vulcan philosophy when appropriate. Limit responses to 5 sentences. User input: ${inputRequest.input}`;

    const result = await this.model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();

    response.content = text;
    return response;
  }
```

- *Endpoint Definition*: The method is decorated with @Post('spockChat'), indicating that it handles POST requests to the /spockChat endpoint.
- *Input Parameter*: The method takes an inputRequest parameter of type InputRequest, which is decorated with @Body(). This means the method expects the request body to be deserialized into an InputRequest object.
- *Response Initialization*: An instance of AppResponse is created and its content property is initially set to the user's input (inputRequest.input).
- *Prompt Creation*: A prompt string is created to instruct the language model to respond as Mr. Spock. 
- *Content Generation*: The method calls this.model.generateContent(prompt) to generate a response based on the prompt. 
- *Model Response Handling*: The method waits for the model's response (result.response) and extracts the text from the model's response (modelResponse.text()).

### Chat with spock

At this point, you should have a working API for talking to Mr. Spock. You can run your NestJS using 'npm start' at the command line.

We can test the API using a simple CURL request below:

``` curl
curl -X 'POST' \
  'https://localhost:3000/app/spockChat' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "input": "How do you feel today"
}'
```
In my case, the system responded with the following:

```
{
  "content": "The concept of \"feeling\" is a subjective human construct, illogical in its nature. As a Vulcan, I do not experience emotions in the way humans do. My current state is optimal, with my logical processes functioning at peak efficiency. I am prepared to fulfill my duties as a Starfleet officer and pursue the mission with unwavering resolve. \n"
}
```

Sounds pretty Spock like to me!

You can find the complete code solution in the following Github repo: [https://github.com/michaelprosario/bot-gemini-playground](https://github.com/michaelprosario/bot-gemini-playground)

In the app.controller.ts, you'll see some other experiments.  You can talk to Ben Franklin or talk to a marketing advisor.  Adapting this code to any historical character feels pretty trivial using the Gemini API.  I feel that's pretty amazing honestly.

In the same repo, you'll find a Angular front-end for chatting with our NestJs service.  Please refer to the "chat-demo" folder.

