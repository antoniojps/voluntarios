import { errSchema, resSchema } from '../../../utils/schemas';
import { sendEmail } from '../../../services/email'

export default async (req, res) => {
  switch (req.method) {
    case 'POST': {
      const {
        body: { name, to, url },
      } = req;

      if (!name || !to || !url) {
        res.status(400).json(errSchema('Invalid parameters', 401));
      }

      try {
        await sendEmail({
          to,
          templateId: 'd-8f1135aec9604d24987a1d65edfae6f3',
          dynamic_template_data: {
            username: name,
            to,
            url,
          },
        });
        res.status(200).json(
          resSchema(
            {
              to,
              name,
              url,
            },
            200,
          ),
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
