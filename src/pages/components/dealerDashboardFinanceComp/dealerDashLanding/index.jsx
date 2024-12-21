import React from 'react';
import './style.scss';
import landing_image from '../../../../assets/img/fe-1.jpeg'


const DealerDashLanding = () => {
    return(
        <div className="dlr-dash-land-main">
            <img src={landing_image} alt="" />
        </div>
    )
}

export default DealerDashLanding;