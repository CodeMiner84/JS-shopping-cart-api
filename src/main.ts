import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('JSshop')
    .setDescription('JSshops API description')
    .setVersion('1.0')
    .addTag('jsshop')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3010);
}
bootstrap();
