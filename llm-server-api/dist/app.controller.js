"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.AppResponse = exports.InputRequest = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
const generative_ai_1 = require("@google/generative-ai");
class InputRequest {
}
exports.InputRequest = InputRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InputRequest.prototype, "input", void 0);
class AppResponse {
}
exports.AppResponse = AppResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AppResponse.prototype, "content", void 0);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
    async chat(inputRequest) {
        const response = new AppResponse();
        response.content = inputRequest.input;
        const prompt = inputRequest.input;
        const result = await this.model.generateContent(prompt);
        const modelResponse = await result.response;
        const text = modelResponse.text();
        response.content = text;
        return response;
    }
    async spockChat(inputRequest) {
        const response = new AppResponse();
        response.content = inputRequest.input;
        const prompt = `Respond as Mr. Spock from Star Trek. Be logical, concise, and avoid emotional responses. Use formal language and reference Vulcan philosophy when appropriate. Limit responses to 5 sentences. User input: ${inputRequest.input}`;
        const result = await this.model.generateContent(prompt);
        const modelResponse = await result.response;
        const text = modelResponse.text();
        response.content = text;
        return response;
    }
    async benFranklinChat(inputRequest) {
        const response = new AppResponse();
        response.content = inputRequest.input;
        const prompt = `Respond as Ben Franklin. Limit responses to 7 sentences. User input: ${inputRequest.input}`;
        const result = await this.model.generateContent(prompt);
        const modelResponse = await result.response;
        const text = modelResponse.text();
        response.content = text;
        return response;
    }
    async robotController(inputRequest) {
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('chat1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputRequest]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('spockChat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputRequest]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "spockChat", null);
__decorate([
    (0, common_1.Post)('benFranklinChat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputRequest]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "benFranklinChat", null);
__decorate([
    (0, common_1.Post)('robotController'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputRequest]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "robotController", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('app'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map