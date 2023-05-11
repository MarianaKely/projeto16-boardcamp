
export default function middlewareSchema(schema) {

    return (req, res, next) => {

      const invalidMiddleware = schema.validate(req.body, { abortEarly: false });

      if (invalidMiddleware.error) {

        return res.status(400).send(validation.error.details.map((parameter) => parameter.message));

      }

      console.log('internal error');

      next();

      console.log('ok');

    };

  }