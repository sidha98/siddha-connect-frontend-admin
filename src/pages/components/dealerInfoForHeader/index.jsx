import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./style.scss";
import config from "../../../config";

const { backend_url } = config;

export default function DealerInfoForHeader() {
    const [creditLimit, setCreditLimit] = useState(null);
    const [error, setError] = useState(null);
    const [timestamp, setTimestamp] = useState(new Date());

    useEffect(() => {
        const fetchCreditLimit = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("You are not authenticated. Please log in again.");
                    return;
                }



                // Make the API call to fetch the credit limit
                const response = await axios.get(
                    `${backend_url}/fetch-credit-limit`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                        },
                    }
                );

                // Check if the dealer is in the MDD category
                if (response.data.success) {
                    setCreditLimit(response.data.data.creditLimit);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching credit limit:", error.message || error.response?.data || error);
                setError("Failed to fetch credit limit. Please try again.");
            }
        };

        fetchCreditLimit();

        // Update timestamp every minute
        const interval = setInterval(() => setTimestamp(new Date()), 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dih-main">
            <div className="avail-limit-head">
                <p>Available Credit Limit</p>
            </div>
            <div className="limit-avail">
                {error ? (
                    <p className="error">{error}</p>
                ) : creditLimit !== null ? (
                    <p>₹ {creditLimit.toLocaleString("en-IN")}</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className="date-time-limit">
                <p>{timestamp.toLocaleDateString("en-IN")}, {timestamp.toLocaleTimeString("en-IN")}</p>
            </div>
        </div>
    );
}
