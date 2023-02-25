import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorLevel {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export interface BadExceptionInterface {
	statusCode: number;
	message: string;
	errorLevel?: ErrorLevel;
}

export class BadException extends HttpException {
	public level: ErrorLevel;

	constructor(message: string, errorLevel: ErrorLevel) {
		const defaultResponse: BadExceptionInterface = {
			statusCode: HttpStatus.BAD_REQUEST,
			message,
		};
		const error: BadExceptionInterface = {
			...defaultResponse,
			errorLevel,
		};
		super(error, HttpStatus.BAD_REQUEST);
	}
}
