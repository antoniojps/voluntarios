import sgMail from '@sendgrid/mail';
const { EMAIL_API_KEY, EMAIL_SENDER } = process.env;

export const sendEmail = async (data) => {
  if (!data.to) throw new Error('Missing to field')
  sgMail.setApiKey(EMAIL_API_KEY);
  const msg = {
    from: EMAIL_SENDER,
    ...data,
    to: process.env.NODE_ENV === 'production' ? data.to : EMAIL_SENDER,
  };
  try {
    await sgMail.send(msg);
  } catch (err) {
    throw new Error(err.message || 'error sending email');
  }
};