import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';
import {TemplateController} from "./modules/template/template.controller";
import {ExampleController} from "./modules/example/example.controller";
import {LLMClient} from "./modules/llm/llm.client";
import {LLMAdapter} from "./modules/llm/llm.adapter";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        HttpModule,
    ],
    controllers: [TemplateController, ExampleController],
    providers: [LLMClient, LLMAdapter],
})
export class AppModule {
}
