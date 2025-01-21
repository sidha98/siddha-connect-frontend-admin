import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./style.scss";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";
import PaymentTable from "../components/paymentTable";

export default function PaymentCalculator() {
  const [invoiceAmounts, setInvoiceAmounts] = useState([]);
  const [debitNoteAmounts, setDebitNoteAmounts] = useState([]);
  const [creditNoteAmounts, setCreditNoteAmounts] = useState([]);

  // // Track whether selections have been made in Debit and Credit Note tables
  // const [isDebitNoteSelected, setIsDebitNoteSelected] = useState(false);
  // const [isCreditNoteSelected, setIsCreditNoteSelected] = useState(false);
 
  const [debitAllSelected, setDebitAllSelected] = useState(false);
  const [creditAllSelected, setCreditAllSelected] = useState(false);

  const calculateTotal = () => {
    const invoiceAmount =
      invoiceAmounts.reduce((total, amount) => total + parseFloat(amount), 0) ||
      0;
    const debitNoteAmount =
      debitNoteAmounts.reduce(
        (total, amount) => total + parseFloat(amount),
        0
      ) || 0;
    const creditNoteAmount =
      creditNoteAmounts.reduce(
        (total, amount) => total + parseFloat(amount),
        0
      ) || 0;

    return invoiceAmount + debitNoteAmount - creditNoteAmount;
  };

  const handleDebitSelection = (allSelected) => {
    console.log("Debit All Selected:", allSelected);
    setDebitAllSelected(allSelected);
  };

  const handleCreditSelection = (allSelected) => {
    console.log("Credit All Selected:", allSelected);
    setCreditAllSelected(allSelected);
  };

  const { number } = useSpring({
    from: { number: 1000 },
    to: { number: calculateTotal() },
    config: { duration: 200 },
  });

  const formatNumberIndian = (num) => {
    const [integerPart, decimalPart] = num.toFixed(2).split(".");
    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    const formattedInteger =
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      (otherDigits ? "," : "") +
      lastThreeDigits;
    return `₹ ${formattedInteger}.${decimalPart}`;
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(["Payment Advice Placeholder"], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Payment_Advice.txt";
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
            <animated.h2>{number.to((n) => formatNumberIndian(n))}</animated.h2>
          </div>
          <div className="save-adv-btn" onClick={handleDownload}>
            <AwesomeButton
              cssModule={AwesomeButtonStyles}
              type="primary"
              onPress={() => {}}
            >
              <LiaCloudDownloadAltSolid style={{ fontSize: "20px" }} />
            </AwesomeButton>
          </div>
        </div>
        <div className="pcal-tables-main">
          <div className="invoices-main">
            <h3>Invoices</h3>
            <PaymentTable
              voucherTypes={["Sales", "SalesD2D", "Sales DMS"]}
              onAmountsUpdate={setInvoiceAmounts}
              disableSelection={!debitAllSelected || !creditAllSelected} // Disable based on Debit & Credit selection
            />
          </div>
          <div className="cn-main">
            <h3>Credit Notes</h3>
            <PaymentTable
              voucherTypes={[
                "Credit Note",
                "Receipt",
                "Sales Return Credit Note",
                "Purchase Visiblity",
              ]}
              onAmountsUpdate={setCreditNoteAmounts}
              onAllSelected={handleCreditSelection} // Callback for selection tracking
            />
          </div>
          <div className="dn-main">
            <h3>Debit Notes</h3>
            <PaymentTable
              voucherTypes={["Payment", "Debit Note"]}
              onAmountsUpdate={setDebitNoteAmounts}
              onAllSelected={handleDebitSelection} // Callback for selection tracking
            />
          </div>
        </div>
      </div>
    </>
  );
}
