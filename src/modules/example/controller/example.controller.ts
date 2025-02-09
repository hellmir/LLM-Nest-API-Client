import {Controller, Get, Query, Res, Sse} from '@nestjs/common';
import {Response} from 'express';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LLMClient} from "../../llm/client/llm.client";

@Controller()
export class ExampleController {
    private readonly template: string = process.env.LLM_RECIPE_TEMPLATE || '레시피 템플릿';

    constructor(private readonly llmStreamingService: LLMClient) {
    }

    @Get('/example')
    requestRecipeLLM(
        @Query('mealType') mealType: string,
        @Query('cuisineType') cuisineType: string,
        @Query('ingredients') ingredients: string[],
        @Query('cookingUtensils') cookingUtensils: string[],
        @Query('cookingTime') cookingTime: string,
        @Res() res: Response,
    ): void {
        res.setHeader('Content-Type', 'text/event-stream');

        const options = {mealType, cuisineType, ingredients, cookingUtensils, cookingTime};
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

    @Sse('/example/sse')
    requestRecipeSSELLM(
        @Query('mealType') mealType: string,
        @Query('cuisineType') cuisineType: string,
        @Query('ingredients') ingredients: string[],
        @Query('cookingUtensils') cookingUtensils: string[],
        @Query('cookingTime') cookingTime: string,
    ): Observable<{ data: string }> {
        const options = {mealType, cuisineType, ingredients, cookingUtensils, cookingTime};
        return this.llmStreamingService.receiveLLMStreamingSSE(options, this.template).pipe(
            map(chunk => ({data: `data: ${chunk}\n\n`})),
        );
    }
}
