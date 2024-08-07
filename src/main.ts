import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Ninja-API')
    .setDescription('the description of the api')
    .setVersion('1.0')
    .build()
  const Document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/',app,Document)
  await app.listen(3000);
}
bootstrap();
