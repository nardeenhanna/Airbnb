import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // تفعيل تجميع البيانات والتحقق من الـ Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // إعدادات Swagger
  const config = new DocumentBuilder()
    .setTitle('Airbnb API')
    .setDescription('Airbnb Clone Backend API Documentation')
    .setVersion('1.0')
    .addBearerAuth() // لتجهيز إمكانية استخدام JWT Tokens مستقبلاً
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000/api`);
}
bootstrap();