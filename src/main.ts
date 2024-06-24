import { NestFactory } from '@nestjs/core';
import { appModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(appModule);


  // Swagger UI configuration
  const config = new DocumentBuilder()
    .setTitle('To do API')
    .setDescription('API simples de gerenciamento de to do task`s')
    .setVersion('0.1.0')
    .setLicense('MIT', 'https://spdx.org/licenses/MIT.html')
    .setContact('Matheus Ferreira', 'https://matheusferrera.com', 'dev.matheusfa@gmail.com')
    .addServer('http://localhost:3001')
    .build(); 

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  //  // Load your custom JSON
  //  const customJson = JSON.parse(fs.readFileSync('src/documents/task.json', 'utf8'));

  // // Merge custom JSON into the generated Swagger document
  // Object.assign(document, customJson);

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  )

  //Validadores dos DTO`s
  app.useGlobalPipes(new ValidationPipe());

  //Habilitandao o cors geral -> PERIGOSO! <-
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
