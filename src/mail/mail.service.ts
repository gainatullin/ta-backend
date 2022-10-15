import { HttpStatus, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  async send(emailTo, subject, text, html) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      auth: {
        user: 'ta-official@yandex.ru',
        pass: 'TaAreaTeam123',
      },
    });

    await transporter.sendMail({
      from: '"TA-TEAM" <ta-official@yandex.ru>',
      to: emailTo,
      subject: subject,
      text: text,
      html: html,
    });
    return HttpStatus.OK;
  }
}
