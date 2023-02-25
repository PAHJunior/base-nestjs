import { Test, TestingModule } from '@nestjs/testing';
import { BadExceptionController } from './bad-exception.controller';
import { BadExceptionService } from './bad-exception.service';

describe('BadExceptionController', () => {
	let badExceptionController: BadExceptionController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [BadExceptionController],
			providers: [BadExceptionService],
		}).compile();

		badExceptionController = app.get<BadExceptionController>(
			BadExceptionController
		);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(badExceptionController.getHello()).toBe('Hello World!');
		});
	});
});
