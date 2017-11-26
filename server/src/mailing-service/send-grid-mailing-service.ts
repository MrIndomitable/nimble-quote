import { Guid } from "../types/common";
const sgMail = require('@sendgrid/mail');

export interface IMailService {
  sendOfferQuoteEmail: (offer: OfferQuoteEmail) => void;
  sendPurchaseOrder: (purchase: PurchaseOrderEmail) => void;
  sendNewOfferNotification: (offer: NewOfferNotification) => void;
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
  link: string;
}

type NewOfferNotification = {
  buyer: { displayName: string, email: string };
  supplier: { displayName: string, email: string };
  offerLink: string;
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
    console.log(offerQuoteEmail.offerLink.replace('https://nimble-quote.herokuapp.com/', 'http://localhost:3000/'));
    console.log('--------------------------------------------');
    sgMail.send(msg);
  };

  const sendPurchaseOrder = ({ supplier, company, link }: PurchaseOrderEmail) => {
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
href="${link}">View Order</a>`;

    const msg = {
      to: supplier.email,
      from: company.email,
      subject: 'New order is waiting for you at nimble-quote.com',
      text: `You have a new order from ${company.email} at nimble-quote.com`,
      html,
    };

    console.log('----------- for local development ----------');
    console.log(link.replace('https://nimble-quote.herokuapp.com/', 'http://localhost:3000/'));
    console.log('--------------------------------------------');
    sgMail.send(msg);
  };

  const sendNewOfferNotification = (offer: NewOfferNotification) => {
    const html = `<h2>Hi ${offer.buyer.displayName}</h2>
<p>You have a new offer waiting for you from ${offer.supplier.email}</p>
<a style="
    background-color: #1E90FF;
    color: white;
	padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 25px;
"
href="${offer.offerLink}">View Order</a>`;

    const msg = {
      to: offer.buyer.email,
      from: offer.supplier.email,
      subject: 'New offer is waiting for you at nimble-quote.com',
      text: `You have a new offer from ${offer.supplier.displayName} at nimble-quote.com`,
      html,
    };

    console.log(msg);
    sgMail.send(msg);
  };

  return {
    sendOfferQuoteEmail,
    sendPurchaseOrder,
    sendNewOfferNotification
  };
};