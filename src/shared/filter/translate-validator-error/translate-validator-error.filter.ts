import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class TranslateValidatorErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 422) {
      const error = exception.getResponse() as any;

      if (Array.isArray(error)) {
        error.forEach((err) => (err = this._translateValidationError(err)));
        response.status(status).json(exception);
      } else {
        response.status(status).json(exception);
      }
    } else {
      response.status(status).json(exception);
    }
  }

  private _translateValidationError(error: ValidationError): ValidationError {
    if (!error.constraints && error.children) {
      error.children.forEach(
        (errorChild) =>
          (errorChild = this._translateValidationError(errorChild)),
      );
    }
    if (error.constraints) {
      if (error.constraints.isNotEmpty) {
        error.constraints.isNotEmpty = 'Ne doit pas être vide';
      }

      if (error.constraints.min) {
        const value = error.constraints.min.split('than')[1];
        error.constraints.min = 'Doit être supérieur à' + value + '.';
      }

      if (error.constraints.max) {
        const value = error.constraints.max.split('than')[1];
        error.constraints.max = 'Doit être inférieur à' + value + '.';
      }

      if (error.constraints.isDate) {
        error.constraints.isDate = 'Doit être une date';
      }
    }

    return error;
  }
}
