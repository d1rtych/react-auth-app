import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
  path: '/api/test-email',
  method: 'post',
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: 'dorganov.sergey+test1@gmail.com',
        from: 'dorganov.sergey@gmail.com',
        subject: 'Test Email',
        text: 'It works'
      });

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}