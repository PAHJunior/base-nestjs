import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorLevelEnum {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export interface BadExceptionInterface {
	message: string;
	errorLevel: ErrorLevelEnum;
	statusCode?: number;
}

export class BadException extends HttpException {
	private customMessage: BadExceptionInterface;

	constructor(badException: BadExceptionInterface) {
		const error: BadExceptionInterface = {
			statusCode: HttpStatus.BAD_REQUEST,
			...badException,
		};
		super(error, HttpStatus.BAD_REQUEST);
		this.customMessage = error;
	}

	public getResponse(): BadExceptionInterface {
		return this.customMessage;
	}
}
