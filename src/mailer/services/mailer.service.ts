import { Injectable, Inject } from '@nestjs/common';

export interface MailerParams {}

export const MAILER_TEMPLATE_REGISTER = '../templates/test';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MailerProvider') private readonly mailerProvider,
  ) {}

  async sendMail(to: string, subject: string, template: string, context: any): Promise<any> {
    this.mailerProvider.sendMail({
      to,
      from: 'test@example.com',
      subject,
      template: MAILER_TEMPLATE_REGISTER,
      context,
    });
  }
}