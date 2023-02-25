import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common';
import { BadException, ErrorLevel } from './bad-exception.filter';

@Injectable()
export class BadExceptionService {
	constructor(private logger: Logger) {}

	getBadException(): string {
		const badExceptions = [
			new BadException('Erro de nível baixo.', ErrorLevel.HIGH),
		];

		for (const badException of badExceptions) {
			this.logger.log('Bad exception level', null, badException);
		}

		return `Foram entrandados ${badExceptions.length} errors`;
	}
}
