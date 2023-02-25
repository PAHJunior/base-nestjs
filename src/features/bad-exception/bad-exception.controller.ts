import { Controller, Get } from '@nestjs/common';
import { BadExceptionService } from './bad-exception.service';

@Controller('bad-exception')
export class BadExceptionController {
	constructor(private readonly badExceptionService: BadExceptionService) {}

	@Get()
	getBadException(): string {
		return this.badExceptionService.getBadException();
	}
}
