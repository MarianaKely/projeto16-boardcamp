
export function middleware (parameter) {

	return (req, res, next) => {

		const { invalidMiddleware } = parameter.validate(req.body, { abortEarly: false });

		if (invalidMiddleware) {

			const eradeInvalidMiddleware = invalidMiddleware.details.map((err) => err.message);
			return res.status(400).send(eradeInvalidMiddleware);

		}

		next();

        console.log('ToNext');
	};
}