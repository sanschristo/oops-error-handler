# oops-error-handler
This package provides an error handling middleware for Express applications.

## Installation
To install this package, use npm:

``npm install oops-error-handler``
Usage
The error handling middleware is used to handle errors that occur during request processing in your Express application. To use the middleware, import it into your application:


``const errorHandler = require('oops-error-handler');``

Then, add it as middleware to your Express application:

``app.use(errorHandler());``

This will add the error handling middleware to your application's middleware stack. When an error occurs during request processing, the middleware will catch it and handle it appropriately.

## Customization
The error handling middleware can be customized by passing options to the errorHandler function. The available options are:

- `handlers`: An object that maps error names to custom error handling functions.
- `logger`: A function that logs error messages.
- `reporter`: A function that reports errors to an external service.
- `formaters`: An object that maps error formats to formatting functions.

``
const errorHandler = require('oops-error-handler');

app.use(errorHandler({
  handlers: {
    'NotFoundError': (error, res) => {
      res.status(404).send('Not found');
    },
    'UnauthorizedError': (error, res) => {
      res.status(401).send('Unauthorized');
    }
  },
  logger: (level, message, metadata) => {
    console.log(`[${level}] ${message}`, metadata);
  },
  reporter: (error) => {
    // Send error report to external service
  },
  formaters: {
    'html': (error) => {
      return `<html><body><h1>${error.message}</h1></body></html>`;
    },
    'json': (error) => {
      return {
        error: {
          message: error.message,
          code: error.code
        }
      };
    }
  }
}));
``

## Writing custom error handlers

You can write custom error handlers by adding them to the handlers object. Error handlers are functions that take three arguments: the error object, the response object, and the options object.

``
const errorHandler = require('express-error-handler-middleware');
const MyCustomError = require('./my-custom-error');

app.use(errorHandler({
  handlers: {
    'MyCustomError': (error, res) => {
      res.status(400).send(error.message);
    }
  }
}));

app.get('/', (req, res, next) => {
  const error = new MyCustomError('Something went wrong');
  next(error);
});
``

In this example, a custom error handler is added for a MyCustomError error. When this error is thrown in a request handler, the error handler will be invoked with the error object and the response object. The error handler can then use the response object to send an appropriate response to the client.

## Writing custom error formats
You can write custom error formats by adding them to the formaters object. Error formats are functions that take the error object as an argument and return a formatted error response.

``
const errorHandler = require('express-error-handler-middleware');

app.use(errorHandler({
  formaters: {
    'xml': (error) => {
      return `<error><message>${error.message}</message><code>${error.code}</code></error>`;
    }
  }
}));
``

In this example, a custom error format is added for an xml format. When an error is thrown and the client has requested an xml response format, the error formatter will be invoked with the error object and