class InjectEnvironmentDto {
	public key: string;
	public parse?: boolean;
	public defaultValue?: string;
}

export const InjectEnvironment = (
	injectEnvironment: InjectEnvironmentDto
): PropertyDecorator => {
	return (target: object, propertyKey: string | symbol) => {
		const { key, parse, defaultValue } = injectEnvironment;
		Object.defineProperty(target, propertyKey, {
			get: () => {
				if (parse) {
					JSON.parse(process.env[key.toUpperCase()]);
				}
				return process.env[key.toUpperCase()] || defaultValue;
			},
			configurable: true,
			enumerable: true,
		});
	};
};
