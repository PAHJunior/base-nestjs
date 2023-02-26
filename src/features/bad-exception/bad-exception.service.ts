import { Injectable } from '@nestjs/common';
import { Logger } from '../../common';
import { BadException, ErrorLevelEnum } from './bad-exception.filter';

@Injectable()
export class BadExceptionService {
	constructor(private logger: Logger) {}

	getBadException(): string {
		const badExceptions = [
			new BadException({
				message: 'Error low level.',
				errorLevel: ErrorLevelEnum.LOW,
			}),
			new BadException({
				message: 'Error high level',
				errorLevel: ErrorLevelEnum.HIGH,
			}),
		];

		for (const badException of badExceptions) {
			const error = badException.getResponse();
			this.logger.log('Bad exception level', null, error);
		}

		return `Found ${badExceptions.length} errors`;
	}
}
