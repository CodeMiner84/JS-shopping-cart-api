import { HttpException } from '@nestjs/common';

export class DuplicateException extends HttpException {
  constructor(message?: string | object, status?: number) {
    super(message, status);
  }
}