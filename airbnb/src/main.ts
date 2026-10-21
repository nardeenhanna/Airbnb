import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*', // أو ضعي رابط Vercel الخاص بالـ Frontend
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
