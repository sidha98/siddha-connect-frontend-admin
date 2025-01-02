import React from 'react';
import './style.scss';

export default function DealerInfoForHeader() {
    return (
        <div className="dih-main">
            <div className="avail-limit-head">
                <p>Available Credit Limit</p>
            </div>
            <div className="limit-avail">
                <p>₹ 2,13,28,345</p>
            </div>

            <div className="date-time-limit">
                <p>2 January, 2025 | 16:00</p>
            </div>
        </div>
    );
}
