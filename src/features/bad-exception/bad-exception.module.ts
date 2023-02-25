import { Module } from '@nestjs/common';
import { Logger } from 'src/common';
import { BadExceptionController } from './bad-exception.controller';

import { BadExceptionService } from './bad-exception.service';

@Module({
	imports: [],
	controllers: [BadExceptionController],
	providers: [BadExceptionService, Logger],
})
export class BadExceptionModule {}
