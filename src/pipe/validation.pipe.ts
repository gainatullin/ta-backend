import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} ${Object.values(err.constraints).join(', ')}`;
      });

      messages.map((message) => new ErrorException({ message: message, code: 'ERROR' }).throwError());
    }
    return value;
  }
}
