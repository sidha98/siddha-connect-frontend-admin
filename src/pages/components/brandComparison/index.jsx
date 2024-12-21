// reports/BrandComparison.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
const { backend_url } = config;

function BrandComparison() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backend_url}/extraction/brand-comparison?month=10&year=2024`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Brand Comparison Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Total Volume</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((brand) => (
                        <tr key={brand.brand}>
                            <td>{brand.brand}</td>
                            <td>{brand.totalVolume}</td>
                            <td>{brand.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BrandComparison;
