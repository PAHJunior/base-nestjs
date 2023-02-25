import * as winston from 'winston';
import * as Transport from 'winston-transport';

export default class ConsoleTransport {
	private static lastTimestamp?: number;

	/**
	 * Load transport console.
	 */
	public static load(): Transport {
		return new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf((info) => {
					const colorizer = winston.format.colorize();

					const pidMessage = colorizer.colorize(
						info.level,
						`[Nest] PID: ${process.pid} - `,
					);
					const contextMessage = info.context
						? colorizer.colorize('warn', `[${info.context}] `)
						: '';
					const output =
						typeof info.message === 'object'
							? `${colorizer.colorize(
								info.level,
								'Object: ',
							  )}\n${JSON.stringify(info.message, null, 2)}\n`
							: colorizer.colorize(info.level, info.message);
					const timestampActual = ConsoleTransport.getTimestamp();
					const timestampDiff = ConsoleTransport.updateAndGetTimestampDiff(
						info.isTimestampEnabled,
					);
					const errorTrace = info.trace ? `\n${info.trace}` : '';
					const metaKeys = Object.keys(info)
						.filter(
							(key) =>
								!['trace', 'message', 'level', 'timestamp', 'context'].includes(
									key,
								),
						)
						.map((key) => {
							try {
								return { [key]: JSON.parse(info[key]) };
							} catch {
								return { [key]: info[key] };
							}
						})
						.reduce((itemA, itemB) => ({ ...itemA, ...itemB }), {});
					const meta =
						Object.keys(metaKeys).length > 0
							? colorizer.colorize(
								'debug',
								`\nFields:\n${JSON.stringify(metaKeys, null, 2)}`,
							  )
							: '';

					return `${pidMessage}${timestampActual} ${contextMessage}${output}${timestampDiff}${errorTrace}${meta}`;
				}),
			),
		});
	}

	/**
	 * Format timestamp for human.
	 */
	private static getTimestamp(): string {
		const localeStringOptions: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			day: '2-digit',
			month: '2-digit',
		};
		return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
	}

	/**
	 * Get difference between last occurrence and now.
	 * @param isTimeDiffEnabled
	 */
	private static updateAndGetTimestampDiff(
		isTimeDiffEnabled?: boolean,
	): string {
		const includeTimestamp =
			ConsoleTransport.lastTimestamp && isTimeDiffEnabled;
		const result = includeTimestamp
			? winston.format
				.colorize()
				.colorize(
					'warn',
					` +${Date.now() - ConsoleTransport.lastTimestamp}ms`,
				)
			: '';
		ConsoleTransport.lastTimestamp = Date.now();
		return result;
	}
}
