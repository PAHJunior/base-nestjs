import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BadExceptionModule } from './features/bad-exception/bad-exception.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
	imports: [
		ConfigModule.forRoot(),
		BadExceptionModule,
		CacheModule.registerAsync({
			useFactory: async () =>
				await redisStore({ socket: { ttl: 5000, host: 'local', port: 1234 } }),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
