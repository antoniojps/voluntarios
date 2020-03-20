import sgMail from '@sendgrid/mail';
import { resSchema } from '../../utils/schemas';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      res.status(200).json(
        resSchema(
          {
            ...process.env,
          },
          200
        )
      );
      break;
    }
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
