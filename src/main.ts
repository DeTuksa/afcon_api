import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
  .setTitle('AFCON API')
  .setDescription('API for the African Cup of Nations')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.use(json({limit: '50mb'}));
  app.use(urlencoded({extended: true, limit: '50mb'}));
  const port = process.env.PORT || 8000;

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
