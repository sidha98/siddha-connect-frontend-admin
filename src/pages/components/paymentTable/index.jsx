import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import config from "../../../config";

const { backend_url } = config;

const columns = [
  { field: "VOUCHERNUMBER", headerName: "Voucher Number", width: 150 },
  { field: "AMOUNT", headerName: "Amount", width: 150 },
  { field: "VOUCHERTYPE", headerName: "Voucher Type", width: 200 },
  { field: "DATE", headerName: "Date", width: 150 },
];

export default function PaymentTable({
  voucherTypes,
  onAmountsUpdate,
  disableSelection,
  onAllSelected,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${backend_url}/get-tally-transactions-for-dealer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedRows = response.data.map((row) => ({
          ...row,
          id: row._id,
        }));

        const filteredRows = formattedRows.filter((row) =>
          voucherTypes.includes(row.VOUCHERTYPE)
        );

        setRows(filteredRows);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [voucherTypes]);

  useEffect(() => {
    if (onAllSelected) {
      const allSelected =
        rows.length === 0 || selectionModel.length === rows.length;
      console.log("All Selected:", allSelected);
      onAllSelected(allSelected);
    }
  }, [selectionModel, rows, onAllSelected]);

  const handleRowSelection = (newSelectionModel) => {
    if (disableSelection) {
      alert(
        "Please complete selection in Debit Note and Credit Note tables first!"
      );
      return;
    }

    setSelectionModel(newSelectionModel);

    const selectedData = rows.filter((row) =>
      newSelectionModel.includes(row.id)
    );
    const amounts = selectedData.map((row) => parseFloat(row.AMOUNT));
    onAmountsUpdate(amounts);
  };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleRowSelection}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
