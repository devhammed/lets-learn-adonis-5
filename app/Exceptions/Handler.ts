/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  };

  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle some exceptions if URL starts with /api/v1
     */
    const errors = {
      'E_ROW_NOT_FOUND': 404,
      'E_AUTHORIZATION_FAILURE': 403,
      'E_UNAUTHORIZED_ACCESS': 401,
    }

    if (error.code in errors && ctx.request.url().startsWith('/api/v1')) {
      return ctx.response.status(errors[error.code]).json({
        errors: [
          {
            message: error.message.replace(new RegExp(`^${error.code}: `), ''),
          },
        ],
      });
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
