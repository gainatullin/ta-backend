import { BadRequestException, HttpStatus } from '@nestjs/common';

export class ErrorException {
  public code: string;
  public message: string;

  constructor({ message, code }) {
    this.code = code;
    this.message = message;
  }

  throwError() {
    throw new BadRequestException({ message: this.message, code: this.code, statusCode: HttpStatus.BAD_REQUEST });
  }
}
