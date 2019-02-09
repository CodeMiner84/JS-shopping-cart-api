import { Module } from '@nestjs/common';
import { MailerModule as Mailer, MailerProvider } from '@nest-modules/mailer';
import { MailerService } from './services/mailer.service';

@Module({
  imports: [
    Mailer.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        secure: false,
        auth: {
          user: 'username',
          pass: 'password',
        },
      },
      defaults: {
        from: '"nest-modules" <example@domain.com>',
      },
      templateDir: './src/mailer/templates',
      templateOptions: {
        engine: 'PUG',
      },
    }),
  ],
  exports: [
    MailerService,
  ],
  providers: [
    MailerService
  ],
})
export class MailerModule { }
