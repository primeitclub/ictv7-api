import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { smtp } from 'src/config/env';
import { mailOtp, mailOtpOrganizer } from './templates/otp.template';
import { OTP } from 'src/app/user/model/Otp.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  organizerMail = 'ict.itclub@gmail.com';
  async sendEmail(receiver: string, subject: string, mailContent: string) {
    this.mailerService.sendMail({
      to: receiver,
      from: `PRIME IT CLUB <${smtp.user}>`,
      subject: subject,
      text: mailContent
    });

    console.log('MAIL SENT TO: ', receiver);
  }
  async sendOTPEmail(
    receiver: string,
    subject: string,
    // mailTemplate: string,
    data?: any
  ) {
    this.mailerService.sendMail({
      to: receiver,
      from: `PRIME IT CLUB <${smtp.user}>`,
      subject: subject,
      html: mailOtp(data)
    });

    console.log('MAIL SENT TO: ', receiver);
  }
  async sendOrganizerEmail(
    subject: string,
    // mailTemplate: string,
    data?: any
  ) {
    this.mailerService.sendMail({
      to: this.organizerMail,
      from: `PRIME IT CLUB <${smtp.user}>`,
      subject: subject,
      html: mailOtpOrganizer(data)
    });

    console.log('MAIL SENT TO: ', this.organizerMail);
  }
}
