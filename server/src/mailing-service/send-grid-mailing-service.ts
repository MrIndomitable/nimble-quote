const sgMail = require('@sendgrid/mail');

type UserProfile = {
  email: string;
};

type OfferQuoteEmail = {
  supplier: UserProfile;
  buyer: UserProfile;
  offerLink: string;
}

export const SendGridMailingService = (apiKey: string) => {
  sgMail.setApiKey(apiKey);

  const sendOfferQuoteEmail = (offerQuoteEmail: OfferQuoteEmail) => {
    const html = `<div>Come check out the latest quote of momats@gmail.com <a
style="
    background-color: #1E90FF;
    color: white;
	padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 25px;
" href="${offerQuoteEmail.offerLink}">Click here</a></div>`;
    const msg = {
      to: offerQuoteEmail.supplier.email,
      from: 'momats@gmail.com',
      subject: 'New quote is available for you at nimble-quote.com',
      text: `Come check out the latest quote of ${offerQuoteEmail.buyer.email}`,
      html,
    };

    console.log(msg);
    sgMail.send(msg);
  };

  return {
    sendOfferQuoteEmail
  };
};