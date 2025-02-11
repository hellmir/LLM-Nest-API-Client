import {LLMClient} from "./llm.client";
import {Response} from 'express';

export class LLMAdapter {
    proceedStreamingFromExternalApi(
        response: Response,
        llmClient: LLMClient,
        options: any,
        template: string,
    ): void {
        const responseFlux = llmClient.receiveLLMStreaming(options, template);
        const subscription = responseFlux.subscribe({
            next: (chunk) => response.write(`data: ${chunk}\n\n`),
            error: (err) => {
                response.write(`에러 발생: ${err}`);
                response.end();
            },
            complete: () => response.end(),
        });

        response.on('close', () => subscription.unsubscribe());
    }
}