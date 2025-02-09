import {Controller, Get, Query, Res, Sse} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LLMClient} from "../../llm/client/llm.client";
import {TemplateRequest} from "../dto/template.request";

@ApiTags('기본 템플릿 API')
@Controller()
export class TemplateController {
    private readonly template: string = process.env.LLM_TEMPLATE || '기본 템플릿';

    constructor(private readonly llmStreamingService: LLMClient) {
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
        const responseFlux = this.llmStreamingService.receiveLLMStreaming(options, this.template);
        const subscription = responseFlux.subscribe({
            next: (chunk) => res.write(`data: ${chunk}\n\n`),
            error: (err) => {
                res.write(`에러 발생: ${err}`);
                res.end();
            },
            complete: () => res.end(),
        });
        res.on('close', () => subscription.unsubscribe());
    }

    @ApiOperation({
        summary: 'LLM SSE API를 통해 특정 도메인 LLM SSE 서비스 이용',
        description: 'LLM API를 통해 특정 도메인 LLM SSE 서비스를 이용할 수 있습니다.',
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
    @Sse('/template/sse')
    requestSSELLM(
        @Query() options: TemplateRequest,
    ): Observable<{ data: string }> {
        return this.llmStreamingService
            .receiveLLMStreamingSSE(options, this.template)
            .pipe(map(chunk => ({data: `data: ${chunk}\n\n`})));
    }
}
