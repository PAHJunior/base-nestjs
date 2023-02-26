import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '../../common';
import { BadExceptionController } from './bad-exception.controller';
import { BadExceptionService } from './bad-exception.service';

describe('BadExceptionController', () => {
	let badExceptionController: BadExceptionController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [BadExceptionController],
			providers: [BadExceptionService, Logger],
		}).compile();

		badExceptionController = app.get<BadExceptionController>(
			BadExceptionController
		);
	});

	describe('BadException', () => {
		it('should return "Found 1 errors!"', () => {
			expect(badExceptionController.getBadException()).toBe('Found 1 errors');
		});
	});
});
