import { Interceptor, NestInterceptor, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Interceptor()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.catch(err => {
      // ошибка DTO проверки
      if (err.status === HttpStatus.BAD_REQUEST) return Observable.throw(err);

      // ошибка BD свойства unique
      if (err.routine === '_bt_check_unique') {
        const property = err.constraint.split('_');
        return Observable.throw(
          new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: 'Bad Request',
              message: [{ constraints: { unique: err.detail }, property: property[property.length - 1] }]
            },
            HttpStatus.BAD_REQUEST
          )
        );
      }

      return Observable.throw(err);
    });
  }
}
