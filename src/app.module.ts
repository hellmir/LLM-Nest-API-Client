import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';
import {TemplateController} from './modules/template/controller/template.controller';
import {ExampleController} from './modules/example/controller/example.controller';
import {LLMClient} from './modules/llm/client/llm.client';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        HttpModule,
    ],
    controllers: [TemplateController, ExampleController],
    providers: [LLMClient],
})
export class AppModule {
}
