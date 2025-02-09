import {Controller, Get, Query, Res, Sse} from '@nestjs/common';
import {Response} from 'express';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LLMClient} from '../../llm/client/llm.client';

@Controller()
export class TemplateController {
    private readonly template: string = process.env.LLM_TEMPLATE || '기본 템플릿';

    constructor(private readonly llmStreamingService: LLMClient) {
    }

    @Get('/template')
    requestLLM(
        @Query('option1') option1: string[],
        @Query('option2') option2: string[],
        @Query('option3') option3: string[],
        @Res() res: Response,
    ): void {
        res.setHeader('Content-Type', 'text/event-stream');

        const options = {option1, option2, option3};
        const stream$ = this.llmStreamingService.receiveLLMStreaming(options, this.template);

        const subscription = stream$.subscribe({
            next: (chunk) => res.write(`${chunk}\n\n`),
            error: (err) => {
                res.write(`에러 발생: ${err}`);
                res.end();
            },
            complete: () => res.end(),
        });

        res.on('close', () => subscription.unsubscribe());
    }

    @Sse('/template/sse')
    requestSSELLM(
        @Query('option1') option1: string[],
        @Query('option2') option2: string[],
        @Query('option3') option3: string[],
    ): Observable<{ data: string }> {
        const options = {option1, option2, option3};
        return this.llmStreamingService.receiveLLMStreamingSSE(options, this.template).pipe(
            map(chunk => ({data: `data: ${chunk}\n\n`})),
        );
    }
}
