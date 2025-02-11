import {Controller, Get, Injectable, Query, Res} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {TypeConverter} from "../common/utils/type-converter";
import {LLMClient} from "../llm/llm.client";
import {LLMAdapter} from "../llm/llm.adapter";
import {TemplateRequest} from "./dto/template.request";

@ApiTags('기본 템플릿 API')
@Controller('/template')
@Injectable()
export class TemplateController {
    private readonly template: string = process.env.LLM_TEMPLATE || '기본 템플릿';

    constructor(private readonly llmClient: LLMClient, private readonly llmAdapter: LLMAdapter) {
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
    @Get()
    requestLLM(
        @Query() templateRequest: TemplateRequest,
        @Res() response: Response,
    ): void {
        const optionsToTransmit =
            TypeConverter.convertInstanceValuesToArray(templateRequest);

        this.llmAdapter.proceedStreamingFromExternalApi(
            response,
            this.llmClient,
            optionsToTransmit,
            this.template,
        );
    }
}
