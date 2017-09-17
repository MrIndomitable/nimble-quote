import React from 'react';
import './POTable.css';
import './POTableItemDetails.css';
import {PurchaseOrderDetails} from '../PurchaseOrderForm/PurchaseOrderSendForm';

const ComponentRow = ({item, quantity, partNumber, manufacture, requireDate, unitPrice, price}) => {
    return <tr>
        <td className="tg-k6pi">{item}</td>
        <td className="tg-k6pi">{quantity}</td>
        <td className="tg-k6pi">{partNumber}</td>
        <td className="tg-k6pi">{manufacture}</td>
        <td className="tg-k6pi">{requireDate}</td>
        <td className="tg-k6pi">${unitPrice}</td>
        <td className="tg-imwf">${price}</td>
    </tr>
};

export const PurchaseOrderTemplateComp = ({company, component, total}) => {
      const componentRows = component.map(component => (
    <ComponentRow key={component.item} {...component}/>
  ));
    return (
        <div className="container">
            <div classNAme="row">

                <div className="col-lg-8 col-lg-offset-2">
                    <table className="tg">
                        <tr>
                            <th className="tg-yw4l" rowSpan="3">{company.companyImg}</th>
                            <th className="tg-yw4l" colSpan="2">{company.companyName}</th>
                            <th className="tg-ujoh" colSpan="3" rowSpan="3">PURCHASE ORDER</th>
                            <th className="tg-9wxo">P.O.Number</th>
                            <th className="tg-poq3" colSpan="2">{company.poNumber}</th>
                        </tr>
                        <tr>
                            <td className="tg-glis" colSpan="2" rowSpan="2">{company.shippingAddress}</td>
                            <td className="tg-e3zv">P.O.Date</td>
                            <td className="tg-031e" colSpan="2">{company.poDate}</td>
                        </tr>
                        <tr>
                            <td className="tg-e3zv">GSA Sale</td>
                            <td className="tg-031e" colSpan="2">{company.gsaSale}</td>
                        </tr>
                        <tr>
                            <td className="tg-031e" colSpan="3" rowSpan="2">To: {company.shippingAddress}</td>
                            <td className="tg-yw4l" rowSpan="2">SHIP TO: </td>
                            <td className="tg-yw4l" colSpan="2" rowSpan="2">{company.shippingAddress}</td>
                            <td className="tg-e3zv">Phone</td>
                            <td className="tg-031e" colSpan="2">{company.phone}</td>
                        </tr>
                        <tr>
                            <td className="tg-e3zv">Contact</td>
                            <td className="tg-031e" colSpan="2">{company.contact}</td>
                        </tr>
                        <tr>
                            <td className="tg-031e" colSpan="9"></td>
                        </tr>
                        <tr>
                            <td className="tg-031e" colSpan="3">FOB: {company.fob}</td>
                            <td className="tg-yw4l" colSpan="3">SHIP VIA: {company.shipVia}</td>
                            <td className="tg-031e" colSpan="3">TERMS: {company.terms}</td>
                        </tr>
                        <tr>
                            <td className="tg-cbwe" colSpan="9"></td>
                        </tr>
                        <tr>
                            <td className="tg-031e" colSpan="9" rowSpan="3">
                                <table className="tg inner-table">
                                    <tr>
                                        <th className="tg-07dj">ITEM</th>
                                        <th className="tg-07dj">QUANTITY</th>
                                        <th className="tg-07dj">PART NUMBER</th>
                                        <th className="tg-07dj">MANUFACTURE</th>
                                        <th className="tg-07dj">REQUIRED DATE</th>
                                        <th className="tg-07dj">UNIT PRICE</th>
                                        <th className="tg-07dj">PRICE</th>
                                    </tr>


                                    {componentRows}


                                    <tr>
                                        <td className="tg-e3zv">Terms<br/><br/></td>
                                        <td className="tg-031e" colSpan="3" rowSpan="2"></td>
                                        <td className="tg-e3zv">SUB-TOTAL: </td>
                                        <td className="tg-34fq" colSpan="2">${total.subTotal}</td>
                                    </tr>
                                    <tr>
                                        <td className="tg-031e">Lorem IpsumLorem Ipsum Lorem Ipsum<br/>Lorem Ipsum Lorem Ipsum Lorem Ipsum</td>
                                        <td className="tg-e3zv">Total: </td>
                                        <td className="tg-js8y" colSpan="2">${total.totalPrice}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>

                        </tr>
                        <tr>

                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export const PurchaseOrderTemplate = () => {
    const company =
        {
            companyImg: "URL",
            companyName: "Good Company",
            companyAddress: "23, 4th street Hights tone, New jersey FRANCE 085578",
            recipientAddress: "23, 4th street Hights tone, New jersey FRANCE 085578",
            shippingAddress: "23, 4th street Hights tone, New jersey FRANCE 085578",
            poNumber: "11389",
            poDate: "Aug/08/2017",
            gsaSale: "No",
            phone: "1716-2876449",
            contact: "Moshe Mosh",
            fob: "fobfob",
            shipVia: "aaa",
            terms: "aaa",
        };

    const component = [
        {
            item: "001",
            quantity: "650",
            partNumber: "0230xxx",
            manufacture: "Excel Technology",
            requireDate: "08/08/2017",
            unitPrice: "14",
            price: "41",
        },
        {
            item: "002",
            quantity: "350",
            partNumber: "0620xyg",
            manufacture: "Excel Technology",
            requireDate: "03/05/2018",
            unitPrice: "23",
            price: "28",
        },
        {
            item: "003",
            quantity: "350",
            partNumber: "0620xyg",
            manufacture: "Excel Technology",
            requireDate: "03/05/2018",
            unitPrice: "23",
            price: "28",
        },
        {
            item: "004",
            quantity: "350",
            partNumber: "0620xyg",
            manufacture: "Excel Technology",
            requireDate: "03/05/2018",
            unitPrice: "23",
            price: "28",
        },

    ];
    const total = {
        terms: "aaa",
        subTotal: "356",
        totalPrice: "3904",
    }
    return <PurchaseOrderTemplateComp component={component} company={company} total={total}/>
}