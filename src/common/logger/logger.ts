/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

import ConsoleTransport from './transports/console';

@Injectable()
export class Logger implements LoggerService {
	private NODE_ENV;

	private logger: winston.Logger;
	protected context: string;
	protected meta: any;

	public constructor() {
		this.setLogger();
	}

	/**
	 * Set logger cursor.
	 */
	public setLogger(): void {
		let transports = [ConsoleTransport.load()];

		if (this.NODE_ENV && this.NODE_ENV !== 'local') {
			transports = [
				new winston.transports.Console({
					format: winston.format.json(),
				}),
			];
		}

		this.logger = winston.createLogger({
			transports,
		});
	}

	/**
	 * Set field context in log.
	 * @param context Context name.
	 */
	public setContext(context: string): void {
		this.context = context;
	}

	/**
	 * Set fields in log.
	 * @param meta Meta object.
	 */
	public setMeta(meta: any): void {
		this.meta = this.transformMeta(meta || {});
	}

	/**
	 * Log info message.
	 *
	 * @param message
	 * @param context
	 * @param meta
	 */
	public log(message: string, context?: string, meta?: any): void {
		this.logger.info(message, {
			context: context || this.context,
			...(this.meta || {}),
			...this.transformMeta(meta || {}),
		});
	}

	/**
	 * Log error message.
	 *
	 * @param message
	 * @param trace
	 * @param context
	 * @param meta
	 */
	public error(
		message: string,
		trace: string,
		context?: string,
		meta?: any,
	): void {
		this.logger.error(message, {
			trace,
			context: context || this.context,
			...(this.meta || {}),
			...this.transformMeta(meta || {}),
		});
	}

	/**
	 * Log warn message.
	 *
	 * @param message
	 * @param context
	 * @param meta
	 */
	public warn(message: string, context?: string, meta?: any): void {
		this.logger.warn(message, {
			context: context || this.context,
			...(this.meta || {}),
			...this.transformMeta(meta || {}),
		});
	}

	/**
	 * Log debug message.
	 *
	 * @param message
	 * @param context
	 * @param meta
	 */
	public debug(message: string, context?: string, meta?: any): void {
		this.logger.debug(message, {
			context: context || this.context,
			...(this.meta || {}),
			...this.transformMeta(meta || {}),
		});
	}

	/**
	 * Log verbose message.
	 *
	 * @param message
	 * @param context
	 * @param meta
	 */
	public verbose(message: string, context?: string, meta?: any): void {
		this.logger.verbose(message, {
			context: context || this.context,
			...(this.meta || {}),
			...this.transformMeta(meta || {}),
		});
	}

	/**
	 * Tranforms meta field to string.
	 *
	 * @param meta Meta fields.
	 */
	private transformMeta(meta: any): any {
		return Object.keys(meta)
			.filter((key) => meta[key])
			.map((key) => {
				return { [key]: meta[key] };
			})
			.reduce(
				(itemA, itemB) => ({
					...itemA,
					...itemB,
				}),
				{},
			);
	}
}
