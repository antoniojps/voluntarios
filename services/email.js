import sgMail from '@sendgrid/mail';
const { EMAIL_API_KEY, EMAIL_SENDER } = process.env;

export const sendEmail = async (msg) => {
  if (!msg.to) throw new Error('Missing to field')
  sgMail.setApiKey(EMAIL_API_KEY);

  try {
    await sgMail.send({
      ...msg,
      from: EMAIL_SENDER,
    });
  } catch (err) {
    throw new Error(err.message || 'error sending email');
  }
};

export const sendVerificationEmail = async ({ to, name, token }) => {
  try {
    await sendEmail({
      to,
      templateId: "d-8f1135aec9604d24987a1d65edfae6f3",
      dynamic_template_data: {
        username: name,
        to,
        url: `${process.env.DOMAIN}/verify?token=${token}`,
      },
    });
  } catch (err) {
    if (process.env !== "production") console.log(err.message)
    throw new Error(err.message || 'error sending email');
  }
}