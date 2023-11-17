import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { smtp } from 'src/config/env';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(receiver: string, subject: string, mailContent: string) {
    this.mailerService.sendMail({
      to: receiver,
      from: `PRIME IT CLUB <${smtp.user}>`,
      subject: subject,
      text: mailContent
    });

    console.log('MAIL SENT TO: ', receiver);
  }
}
