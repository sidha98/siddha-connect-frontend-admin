import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../../../config";
const { backend_url } = config;

function DealerPerformance() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backend_url}/extraction/dealer-performance?month=10&year=2024`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to format numbers according to the Indian numbering system
    const formatNumberIndian = (value) => {
        const x = value.toString();
        const lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '') {
            return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
        }
        return lastThree;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Dealer Performance Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dealer Code</th>
                        <th>Shop Name</th>
                        <th>Total Value</th>
                        <th>Brand Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dealer) => (
                        <tr key={dealer.dealerCode}>
                            <td>{dealer.dealerCode}</td>
                            <td>{dealer.shopName}</td>
                            <td>{formatNumberIndian(dealer.totalValue)}</td>
                            <td>{Object.entries(dealer.brandSales).map(([brand, value]) => (
                                <div key={brand}>{brand}: {formatNumberIndian(value)}</div>
                            ))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DealerPerformance;
