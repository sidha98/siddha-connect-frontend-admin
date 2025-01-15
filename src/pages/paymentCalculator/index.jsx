import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './style.scss';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import { LiaCloudDownloadAltSolid } from "react-icons/lia";
import PaymentTable from '../components/paymentTable';




export default function PaymentCalculator() {
  const targetAmount = 1604876.4;

  // Utility function to format the number according to Indian numbering system
  const formatNumberIndian = (num) => {
    const [integerPart, decimalPart] = num.toFixed(2).split('.');
    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    const formattedInteger =
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (otherDigits ? ',' : '') + lastThreeDigits;
    return `₹ ${formattedInteger}.${decimalPart}`;
  };

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: targetAmount },
    config: { duration: 2000 }, // Duration of the animation (2 seconds)
  });

  // Placeholder function for downloading a document
  const handleDownload = () => {
    // Simulating a file download
    const element = document.createElement('a');
    const file = new Blob(['Payment Advice Placeholder'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Payment_Advice.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="pcal-main">
        <div className="pcal-heading">
          <h1>Payment Calculator</h1>
        </div>
        <div className="pcal-total-main">
          <div className="total-amnt">
            {/* Use the animated.h2 component for the animation */}
            <animated.h2>
              {number.to((n) => formatNumberIndian(n))}
            </animated.h2>
          </div>
          {/* Button to trigger the download functionality */}
          <div className="save-adv-btn" onClick={handleDownload}>
            <AwesomeButton
            cssModule={AwesomeButtonStyles}
            type="primary"
            onPress={() => {
                // do something
            }}>
                <LiaCloudDownloadAltSolid style={{ fontSize: '20px' }}/>
            </AwesomeButton>
            {/* <p>Save Payment Advice</p> */}
          </div>
        </div>
        <div className="pcal-tables-main">
            <div className="invoices-main">
                <h3>Invoices</h3>
                <PaymentTable />
            </div>
            <div className="cn-main">
                <h3>Credit Notes</h3>
                <PaymentTable />
            </div>
            <div className="dn-main">
                <h3>Debit Notes</h3>
                <PaymentTable />
            </div>
        </div>
      </div>
    </>
  );
}
