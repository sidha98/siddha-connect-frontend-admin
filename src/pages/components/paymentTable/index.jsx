import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import config from '../../../config';

const { backend_url } = config;

const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'DATE', headerName: 'Date', width: 150 },
    { field: 'PARTYNAME', headerName: 'Party Name', width: 200 },
    { field: 'VOUCHERNUMBER', headerName: 'Voucher Number', width: 150 },
    { field: 'AMOUNT', headerName: 'Amount', width: 150 },
    { field: 'VOUCHERTYPE', headerName: 'Voucher Type', width: 200 },
    { field: 'dealerCode', headerName: 'Dealer Code', width: 150 },
];

export default function PaymentTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${backend_url}/get-tally-transactions-for-dealer`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Add unique `id` for DataGrid
                const formattedRows = response.data.map((row) => ({
                    ...row,
                    id: row._id, // Assign `_id` as `id`
                }));

                setRows(formattedRows);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
