import React from 'react';
import './style.scss';
import siddha_logo from '../../../../assets/img/siddha-logo.png'

const DealerDashFinHeader = () => {
    return(
        <div className='dealer-dash-fin-header-main'>
            <div className="fin-header-left">
                <div className="siddha-logo">
                    <img src={siddha_logo} alt="" />
                </div>
                <div className="dealer-info">
                    <p>Satyam Electronics</p>
                    <p><span>RAJD9873</span></p>
                </div>
                <div className="available-credit-limit">
                    <p className='acl'>Available Credit Limit</p>
                    <p className='amt'>12,90,89,00 INR</p>
                    <p className='dt'> December 20, 2024 | 12:09 pm</p>
                </div>
            </div>
            <div className="fin-header-right">
                <a href="">Orders</a>
                <a href="">Reports</a>
                <a href="">Profile</a>
                <a href="">Payment</a>
                <a href="">Logout</a>
            </div>
        </div>
    )
}

export default DealerDashFinHeader;