class InjectEnvironmentDto {
	public key: string;
	public parse?: boolean;
}

export const InjectEnvironment = (
	injectEnvironment: InjectEnvironmentDto,
): PropertyDecorator => {
	return (target: object, propertyKey: string | symbol) => {
		const { key, parse } = injectEnvironment;
		Object.defineProperty(target, propertyKey, {
			get: () => {
				if (parse) {
					JSON.parse(process.env[key.toUpperCase()]);
				}
				return process.env[key.toUpperCase()];
			},
			configurable: true,
			enumerable: true,
		});
	};
};
