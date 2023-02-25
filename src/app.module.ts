import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BadExceptionModule } from './features/bad-exception/bad-exception.module';

@Module({
	imports: [ConfigModule.forRoot(), BadExceptionModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
