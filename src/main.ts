import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.enableCors();

    const port = process.env.PORT || 3000;
    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
