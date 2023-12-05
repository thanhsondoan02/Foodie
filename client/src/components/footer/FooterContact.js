import React from 'react';
import Visa from '../../assets/images/payment-methods/visa-icon.svg';
import MasterCard from '../../assets/images/payment-methods/mastercard-icon.svg';
import ApplePay from '../../assets/images/payment-methods/applepay-icon.svg';
import GooglePay from '../../assets/images/payment-methods/googlepay-icon.svg';

export default class FooterContact extends React.Component {
  render() {
    return (
      <section className='footer-contact flex-container flex-column'>
        <h3>Have questions</h3>
        <p>0857951054</p>
        <p>thanhsondoan02@gmail.com</p>
        <p>10:00pm - 5:00am</p>
        <section className='accepted-payments'>
          <img width="50" height="50" src={Visa} alt="Visa card" />
          <img width="50" height="50" src={MasterCard} alt="Master card" />
          <img width="50" height="50" src={ApplePay} alt="Apple pay" />
          <img width="50" height="50" className="google-pay" src={GooglePay} alt="Google pay" />
        </section>
      </section>
    )
  }
}