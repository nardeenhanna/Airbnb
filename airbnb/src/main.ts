import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // تفعيل استقبال الطلبات من الـ Frontend
  app.enableCors();

  await app.listen(3000);
}
bootstrap();