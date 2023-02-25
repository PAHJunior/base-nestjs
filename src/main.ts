import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './common/logger/logger';
import * as packageInfo from '../package.json';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule, {
		logger,
	});

	// Validation
	app.useGlobalPipes(new ValidationPipe());

	// Host and Port
	const port = Number.parseInt(process.env.PORT, 10) || 9000;
	const host = process.env.HOST || '0.0.0.0';
	const url = `http://${host}:${port}`;

	// Documentation
	SwaggerModule.setup(
		'docs',
		app,
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder()
				.setDescription(packageInfo.description)
				.setVersion(packageInfo.version)
				.build()
		)
	);

	await app.listen(port, host);
	logger.log(`${packageInfo.name} is running at ${url}`, 'Main');
}
bootstrap();
