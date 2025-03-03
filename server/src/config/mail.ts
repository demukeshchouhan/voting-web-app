import nodeMailer from "nodemailer";

export const transport = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, body: string) => {
  await transport.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html: body,
  });
};
