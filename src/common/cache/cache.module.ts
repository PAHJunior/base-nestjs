import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { InjectEnvironment } from '../decorators/inject-environment.decorator';

class CustomCacheConfig {
	/* eslint-disable @typescript-eslint/naming-convention */
	@InjectEnvironment({ key: 'node_env', defaultValue: 'local' })
	private NODE_ENV;

	@InjectEnvironment({ key: 'cache_host' })
	private CACHE_HOST;

	@InjectEnvironment({ key: 'cache_port' })
	private CACHE_PORT;

	@InjectEnvironment({ key: 'cache_ttl' })
	private CACHE_TTL;
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * Cache options.
	 */
	public async createCacheOptions(): Promise<CacheModuleOptions> {
		if (!this.NODE_ENV || this.NODE_ENV === 'local') {
			return {};
		}

		return {
			store: async () =>
				await redisStore({
					socket: {
						host: this.CACHE_HOST,
						port: this.CACHE_PORT,
						ttl: this.CACHE_TTL,
					},
				}),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			retry_strategy: function (options): number | Error {
				if (options.total_retry_time > 1000 * 60 * 60) {
					// End reconnecting after a specific timeout and flush all commands
					// with a individual error
					return new Error('Retry time exhausted');
				}

				if (options.attempt > 10) {
					// End reconnecting with built in error
					return;
				}

				// reconnect after
				return Math.min(options.attempt * 100, 3000);
			},
		};
	}
}

@Module({
	imports: [
		CacheModule.registerAsync({
			useClass: CustomCacheConfig,
		}),
	],
	exports: [
		CacheModule.registerAsync({
			useClass: CustomCacheConfig,
		}),
	],
})
export class CustomCacheModule {}
