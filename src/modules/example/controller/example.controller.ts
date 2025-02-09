import {Controller, Get, Query, Res, Sse} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LLMClient} from "../../llm/client/llm.client";
import {ExampleRequest} from "../dto/example.request";

@ApiTags('레시피 정보 조회 예시 API')
@Controller()
export class ExampleController {
    private readonly template: string = process.env.LLM_RECIPE_TEMPLATE || '레시피 템플릿';

    constructor(private readonly llmStreamingService: LLMClient) {
    }

    @ApiOperation({
        summary: 'LLM API를 통해 레시피 정보를 조회하는 예시',
        description: 'LLM API를 통해 레시피 정보를 조회할 수 있습니다.',
    })
    @ApiQuery({
        name: 'mealType',
        description: '식사 유형',
        example: '아침',
    })
    @ApiQuery({
        name: 'cuisineType',
        description: '요리 유형',
        example: '한식',
    })
    @ApiQuery({
        name: 'ingredients',
        description: '재료 목록',
        example: ['된장', '파', '마늘'],
        isArray: true,
    })
    @ApiQuery({
        name: 'cookingUtensils',
        description: '조리 도구',
        example: ['프라이팬', '냄비', '식칼'],
        isArray: true,
    })
    @ApiQuery({
        name: 'cookingTime',
        description: '조리 시간',
        example: '30분',
    })
    @Get('/example')
    requestRecipeLLM(
        @Query() options: ExampleRequest,
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
        summary: 'LLM API를 통해 SSE 방식으로 레시피 정보를 조회하는 예시',
        description: 'LLM API를 통해 SSE 방식으로 레시피 정보를 조회할 수 있습니다.',
    })
    @ApiQuery({
        name: 'mealType',
        description: '식사 유형',
        example: '아침',
    })
    @ApiQuery({
        name: 'cuisineType',
        description: '요리 유형',
        example: '한식',
    })
    @ApiQuery({
        name: 'ingredients',
        description: '재료 목록',
        example: ['된장', '파', '마늘'],
        isArray: true,
    })
    @ApiQuery({
        name: 'cookingUtensils',
        description: '조리 도구',
        example: ['프라이팬', '냄비', '식칼'],
        isArray: true,
    })
    @ApiQuery({
        name: 'cookingTime',
        description: '조리 시간',
        example: '30분',
    })
    @Sse('/example/sse')
    requestRecipeSSELLM(
        @Query() options: ExampleRequest,
    ): Observable<{ data: string }> {
        return this.llmStreamingService
            .receiveLLMStreamingSSE(options, this.template)
            .pipe(map(chunk => ({data: `data: ${chunk}\n\n`})));
    }
}
