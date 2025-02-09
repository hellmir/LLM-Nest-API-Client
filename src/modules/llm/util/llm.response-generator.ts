import {LLMClient} from "../client/llm.client";
import {Response} from 'express';

export class LLMResponseGenerator {
    static transmitResponse(res: Response, llmClient: LLMClient, options: any, template: string): void {
        const responseFlux = llmClient.receiveLLMStreaming(options, template);
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
}
