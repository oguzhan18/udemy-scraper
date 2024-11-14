import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Udemy Scraper API')
    .setDescription('API to pull Udemy course data')
    .setVersion('1.0')
    .addTag('Udemy Scraper')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/swagger-ui', express.static(join(__dirname, '..', 'public')));
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Udemy Scraper API',
    customfavIcon:
      'https://w7.pngwing.com/pngs/13/317/png-transparent-udemy-round-logo-tech-companies.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  await app.listen(3000);
}

bootstrap();
