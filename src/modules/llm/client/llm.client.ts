import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AxiosResponse} from 'axios';
import {Readable} from 'stream';

interface LLMRequest {
    type: string;
    template: string;
    options: any;
    secretKey: string;
}

@Injectable()
export class LLMClient {
    private readonly logger = new Logger(LLMClient.name);
    private readonly llmType: string;
    private readonly secretKey: string;
    private readonly streamingRequestEndpoint: string;
    private readonly sseRequestEndpoint: string;
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        if (!configService) {
            throw new Error('ConfigService가 주입되지 않았습니다!');
        }

        console.log(`🔹 ConfigService에서 LLM_TYPE: ${this.configService.get<string>('LLM_TYPE')}`);

        this.llmType = this.configService.get<string>('LLM_TYPE')!;
        this.secretKey = this.configService.get<string>('LLM_SERVER_SECRET_KEY')!;
        this.streamingRequestEndpoint = this.configService.get<string>('LLM_SERVER_ENDPOINT_STREAMING')!;
        this.sseRequestEndpoint = this.configService.get<string>('LLM_SERVER_ENDPOINT_SSE')!;
        this.baseUrl = 'https://hyobin-llm.duckdns.org';
    }

    private webClientRequest(requestEndpoint: string, llmRequest: LLMRequest): Observable<string> {
        const url = `${this.baseUrl}${requestEndpoint}`;
        return this.httpService
            .post(url, llmRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream',
                },
                responseType: 'stream',
            })
            .pipe(
                switchMap((response: AxiosResponse<Readable>) => {
                    const stream = response.data;
                    let counter = 0;
                    return new Observable<string>(observer => {
                        stream.on('data', (chunk: Buffer) => {
                            counter++;
                            const chunkStr = chunk.toString();
                            if (counter % 10 === 0) {
                                this.logger.log(`Received chunk: ${chunkStr}`);
                            }
                            observer.next(chunkStr);
                        });
                        stream.on('end', () => observer.complete());
                        stream.on('error', err => observer.error(err));
                        return () => stream.destroy();
                    });
                }),
            );
    }

    receiveLLMStreaming(options: any, template: string): Observable<string> {
        const llmRequest: LLMRequest = {
            type: this.llmType,
            template,
            options,
            secretKey: this.secretKey,
        };
        return this.webClientRequest(this.streamingRequestEndpoint, llmRequest);
    }

    receiveLLMStreamingSSE(options: any, template: string): Observable<string> {
        const llmRequest: LLMRequest = {
            type: this.llmType,
            template,
            options,
            secretKey: this.secretKey,
        };
        return this.webClientRequest(this.sseRequestEndpoint, llmRequest);
    }
}
