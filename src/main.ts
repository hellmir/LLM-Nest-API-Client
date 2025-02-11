import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.CLIENT_URL,
        methods: 'GET,POST'
    });

    const config = new DocumentBuilder()
        .setTitle('LLM Streaming API Client Template')
        .setDescription('Nest.js 환경에서 LLM Streaming 서비스를 구현할 수 있는 API Client 템플릿입니다.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);

    Logger.log(`Application is running on: http://localhost:${port}`);
    Logger.log(`Swagger Docs available at: http://localhost:${port}/api`);
}

bootstrap();
