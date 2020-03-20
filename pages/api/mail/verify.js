import sgMail from '@sendgrid/mail';
import { errSchema, resSchema } from '../../../utils/schemas';
import { sendEmail } from '../../../services/email'

export default async (req, res) => {
  switch (req.method) {
    case 'POST': {
      const {
        body: { username, to, url },
      } = req;

      if (!username || !to || !url) {
        res.status(400).json(errSchema('Invalid parameters', 401));
      }

      try {
        await sendEmail({
          to,
          templateId: 'd-615f75613bb74ce597b4a1fa1836c592',
          dynamic_template_data: {
            username,
            to,
            url,
          },
        });
        res.status(200).json(
          resSchema(
            {
              to,
              username,
              url,
            },
            200
          )
        );
      } catch (err) {
        res
          .status(500)
          .json(errSchema(err.message || 'error sending email', 500));
      }
      break;
    }
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
