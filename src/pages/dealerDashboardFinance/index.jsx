import React from "react";
import "./style.scss"
import DealerDashFinHeader from "../components/dealerDashboardFinanceComp/dealerDashFinHeader";
import DealerDashLanding from "../components/dealerDashboardFinanceComp/dealerDashLanding";

const DealerDashboardFinance = ({children}) => {
    return(
        <div className='dlr-dash-fin-main'>
            {<DealerDashFinHeader/>}
            {children}
        </div>
    )
}

export default DealerDashboardFinance;