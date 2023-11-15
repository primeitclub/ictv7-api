import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { smtp } from 'src/config/env';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: smtp.host,
        auth: {
          user: smtp.user,
          pass: smtp.password
        }
      },
      defaults: {
        from: `PRIME IT CLUB <${smtp.user}>`
      },
      template: {}
    })
  ],
  providers: [MailService]
})
export class MailModule {}
