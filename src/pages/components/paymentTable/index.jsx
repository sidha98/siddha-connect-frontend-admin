import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import config from '../../../config';

const { backend_url } = config;

const columns = [
    { field: 'VOUCHERNUMBER', headerName: 'Voucher Number', width: 150 },
    { field: 'AMOUNT', headerName: 'Amount', width: 150 },
    { field: 'VOUCHERTYPE', headerName: 'Voucher Type', width: 200 },
    { field: 'DATE', headerName: 'Date', width: 150 },
];

export default function PaymentTable({ voucherTypes ,onAmountsUpdate}) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
    const [selectedColumns, setSelectedColumns] = useState([]); // Track selected columns
    const [amountsToDisplay, setAmountsToDisplay] = useState([]);


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

                // Add unique id for DataGrid
                const formattedRows = response.data.map((row) => ({
                    ...row,
                    id: row._id, // Assign _id as id
                }));

                // Filter rows based on the voucher types passed as prop
                const filteredRows = formattedRows.filter((row) =>
                    voucherTypes.includes(row.VOUCHERTYPE)
                );

                setRows(filteredRows);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [voucherTypes]);

    const handleRowSelection = (selectionModel) => {
     const selectedData = rows.filter((row) => selectionModel.includes(row.id));
     const amounts = selectedData.map((row) => parseFloat(row.AMOUNT));
     console.log('Selected Amounts:', amounts);
 
     // Notify parent component of selected amounts
     onAmountsUpdate(amounts);
   };


    const handleColumnHeaderClick = (params) => {
        const columnField = params.field;
        setSelectedColumns((prevColumns) => {
            const updatedColumns = prevColumns.includes(columnField)
                ? prevColumns.filter((col) => col !== columnField)
                : [...prevColumns, columnField];
            console.log('Selected Columns:', updatedColumns);
            return updatedColumns;
        });
    };
    return (
     <Paper sx={{ height: '100%', width: '100%' }}>
       <DataGrid
         rows={rows}
         columns={columns}
         loading={loading}
         initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
         pageSizeOptions={[5, 10]}
         checkboxSelection
         onRowSelectionModelChange={handleRowSelection}
         sx={{ border: 0 }}
       />
     </Paper>
   );
}
