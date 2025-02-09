import {Controller, Get, Query, Res} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {LLMClient} from "../../llm/client/llm.client";
import {TemplateRequest} from "../dto/template.request";
import {LLMResponseGenerator} from "../../llm/util/llm.response-generator";

@ApiTags('기본 템플릿 API')
@Controller()
export class TemplateController {
    private readonly template: string = process.env.LLM_TEMPLATE || '기본 템플릿';

    constructor(private readonly llmClient: LLMClient) {
    }

    @ApiOperation({
        summary: 'LLM API를 통해 특정 도메인 LLM 서비스 이용',
        description: 'LLM API를 통해 특정 도메인 LLM 서비스를 이용할 수 있습니다.',
    })
    @ApiQuery({
        name: 'option1',
        description: '첫 번째 옵션',
        example: ['옵션1', '옵션2', '옵션3'],
        isArray: true,
    })
    @ApiQuery({
        name: 'option2',
        description: '두 번째 옵션',
        example: ['옵션1', '옵션2'],
        isArray: true,
    })
    @ApiQuery({
        name: 'option3',
        description: '세 번째 옵션',
        example: ['옵션1', '옵션2', '옵션3', '옵션4'],
        isArray: true,
    })
    @Get('/template')
    requestLLM(
        @Query() options: TemplateRequest,
        @Res() res: Response,
    ): void {
        LLMResponseGenerator.transmitResponse(res, this.llmClient, options, this.template);
    }
}
