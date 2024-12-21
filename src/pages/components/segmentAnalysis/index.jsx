// reports/SegmentAnalysis.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../../../config";
const { backend_url } = config;

function SegmentAnalysis() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backend_url}/extraction/segment-analysis?month=10&year=2024`);
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
            <h2>Segment Analysis Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Segment</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([segment, value]) => (
                        <tr key={segment}>
                            <td>{segment}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SegmentAnalysis;
