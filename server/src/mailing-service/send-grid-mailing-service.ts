import { Guid } from "../types/common";
const sgMail = require('@sendgrid/mail');

export interface IMailService {
  sendOfferQuoteEmail: (offer: OfferQuoteEmail) => void;
  sendPurchaseOrder: (purchase: PurchaseOrderEmail) => void;
}

type UserProfile = {
  email: string;
};

type OfferQuoteEmail = {
  supplier: UserProfile;
  buyer: UserProfile;
  offerLink: string;
}

type PurchaseOrderEmail = {
  supplier: { displayName: string, email: string };
  company: { email: string };
  order: { id: Guid };
}

export const SendGridMailingService = (apiKey: string): IMailService => {
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

    console.log('----------- for local development ----------');
    console.log(offerQuoteEmail.offerLink.replace('https://nimble-quote.herokuapp.com/', 'localhost:3000/'));
    console.log('--------------------------------------------');
    sgMail.send(msg);
  };

  const sendPurchaseOrder = ({supplier, company, order}: PurchaseOrderEmail) => {
    const html = `<h2>Hi ${supplier.displayName}</h2>
<p>You have a new order waiting for you from ${company.email}</p>
<a style="
    background-color: #1E90FF;
    color: white;
	padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 25px;
"
href="https://nimble-quote.herokuapp.com/view?order=${order.id}">View Order</a>`;

    const msg = {
      to: supplier.email,
      from: company.email,
      subject: 'New order is waiting for you at nimble-quote.com',
      text: `You have a new order from ${company.email} at nimble-quote.com`,
      html,
    };

    console.log('----------- for local development ----------');
    console.log(`localhost:3000/view?order=${order.id}`);
    console.log('--------------------------------------------');
    sgMail.send(msg);
  };

  return {
    sendOfferQuoteEmail,
    sendPurchaseOrder
  };
};