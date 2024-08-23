import * as dotenv from 'dotenv';
import express from 'express';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';

dotenv.config();

async function bootstrap() {
  try {
    const port = process.env.PORT || 8080; // Configurar el puerto

    const app = await NestFactory.create(AppModule);

    //Exteder la capacidad de informacion a pasar
    //app.use(bodyParser.json({ limit: '50mb' }));
    //app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    //app.use(express.json());

    app.enableCors({
      origin: (origin, callback) => {
        console.log('CORS origin:', origin); // Mensaje de depuración para el origen
        if (!origin || origin.includes('localhost')) {
          //console.log('ALLOWED!');
          callback(null, true);
          return;
        }

        const allowedOrigins = ['*'];
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
      // allowedHeaders: ['*'],
      //exposedHeaders:['*'],
    });

    await app.listen(port, () => {
      console.debug(`App running on port: ${port}`);
    });
  } catch (err: any) {
    console.debug(`App running crash due to: ${err} `);
  } finally {
    console.log('Nest.js App!');
  }
}
bootstrap();
