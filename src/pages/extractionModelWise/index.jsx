import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, InputLabel, FormControl, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Paper, Pagination, Button, Chip, OutlinedInput, TextField, Switch, FormControlLabel } from '@mui/material';
import config from '../../config';
import './style.scss';

const { backend_url } = config;

function ExtractionModelWise() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 100;
    const [totalRecords, setTotalRecords] = useState(0);

    // Date filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Filter states
    const [brand, setBrand] = useState([]);
    const [model, setModel] = useState([]);
    const [segment, setSegment] = useState([]);
    const [area, setArea] = useState([]);
    const [zsm, setZsm] = useState([]);
    const [rso, setRso] = useState([]);
    const [asm, setAsm] = useState([]);
    const [ase, setAse] = useState([]);
    const [abm, setAbm] = useState([]);
    const [tse, setTse] = useState([]);
    const [dealerCode, setDealerCode] = useState([]);
    const [type, setType] = useState([]);

    const [valueToggle, setValueToggle] = useState(true);
    const [showShare, setShowShare] = useState(false);

    // Options for each dropdown
    const [brandOptions, setBrandOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [segmentOptions, setSegmentOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);
    const [zsmOptions, setZsmOptions] = useState([]);
    const [rsoOptions, setRsoOptions] = useState([]);
    const [asmOptions, setAsmOptions] = useState([]);
    const [aseOptions, setAseOptions] = useState([]);
    const [abmOptions, setAbmOptions] = useState([]);
    const [tseOptions, setTseOptions] = useState([]);
    const [dealerOptions, setDealerOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const brandResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=productId.Brand`);
                setBrandOptions(brandResponse.data.uniqueValues || []);

                const modelResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=productId.Model`);
                setModelOptions(modelResponse.data.uniqueValues || []);

                const segmentResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=productId.Segment`);
                setSegmentOptions(segmentResponse.data.uniqueValues || []);

                const areaResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=Area`);
                setAreaOptions(areaResponse.data.uniqueValues || []);

                const zsmResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ZSM`);
                setZsmOptions(zsmResponse.data.uniqueValues || []);

                const rsoResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=RSO`);
                setRsoOptions(rsoResponse.data.uniqueValues || []);

                const asmResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ASM`);
                setAsmOptions(asmResponse.data.uniqueValues || []);

                const aseResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ASE`);
                setAseOptions(aseResponse.data.uniqueValues || []);

                const abmResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ABM`);
                setAbmOptions(abmResponse.data.uniqueValues || []);

                const tseResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=uploadedBy`);
                setTseOptions(tseResponse.data.uniqueValues || []);

                const dealerResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=dealerCode`);
                setDealerOptions(dealerResponse.data.uniqueValues || []);

                const typeResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=TYPE`);
                setTypeOptions(typeResponse.data.uniqueValues || []);
            } catch (err) {
                console.error('Error fetching dropdown data:', err);
            }
        };

        fetchDropdownData();
    }, []);

    const fetchData = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const valueVolume = valueToggle ? 'value' : 'volume';

            const response = await axios.get(`${backend_url}/extraction/data-model-wise-for-admins`, { 
                params: { ...filters, valueVolume, page, limit: rowsPerPage, showShare: showShare ? 'true' : 'false' }
            });
            
            setData(response.data.data || []);
            setTotalRecords(response.data.totalRecords || 0);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const filters = {
            startDate,
            endDate,
            brand,
            model,
            segment,
            area,
            zsm,
            rso,
            asm,
            ase,
            abm,
            tse,
            dealerCode,
            type,
            showShare
        };
        
        fetchData(filters);
    }, [startDate, endDate, brand, model, segment, area, zsm, rso, asm, ase, abm, tse, dealerCode, type, page, valueToggle, showShare]);

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        setBrand([]);
        setModel([]);
        setSegment([]);
        setArea([]);
        setZsm([]);
        setRso([]);
        setAsm([]);
        setAse([]);
        setAbm([]);
        setTse([]);
        setDealerCode([]);
        setType([]);
        setPage(1);
        fetchData();
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Function to format values with Indian number format
    const formatNumberIndian = (num) => {
        return num.toLocaleString('en-IN');
    };

    const columns = ['Serial Number', 'Brand', 'Model', 'Value', 'Volume', 'Segment'];
    const rows = Array.isArray(data) && data.length > 0 ? data : [];

    return (
        <div>
            <h2>Extraction | Model Wise</h2>

            <div style={{ marginBottom: '20px', marginTop: '40px' }}>
                <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} style={{ marginRight: '20px', marginTop: '20px' }} />
                <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} style={{ marginRight: '20px', marginTop: '20px' }} />

                {[
                    { label: "Brand", value: brand, setValue: setBrand, options: brandOptions },
                    { label: "Model", value: model, setValue: setModel, options: modelOptions },
                    { label: "Segment", value: segment, setValue: setSegment, options: segmentOptions },
                    { label: "Area", value: area, setValue: setArea, options: areaOptions },
                    { label: "ZSM", value: zsm, setValue: setZsm, options: zsmOptions },
                    { label: "RSO", value: rso, setValue: setRso, options: rsoOptions },
                    { label: "ASM", value: asm, setValue: setAsm, options: asmOptions },
                    { label: "ASE", value: ase, setValue: setAse, options: aseOptions },
                    { label: "ABM", value: abm, setValue: setAbm, options: abmOptions },
                    { label: "TSE", value: tse, setValue: setTse, options: tseOptions },
                    { label: "Dealer Code", value: dealerCode, setValue: setDealerCode, options: dealerOptions },
                    { label: "Type", value: type, setValue: setType, options: typeOptions },
                ].map(({ label, value, setValue, options }, idx) => (
                    <FormControl key={idx} style={{ marginRight: '20px', minWidth: 150, marginTop: '20px' }}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            multiple
                            value={value}
                            onChange={(e) => setValue(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                            input={<OutlinedInput label={label} />}
                            renderValue={(selected) => selected.map((val) => <Chip key={val} label={val} />)}
                        >
                            {options.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}

                <FormControlLabel control={<Switch checked={valueToggle} onChange={() => setValueToggle(!valueToggle)} />} label={valueToggle ? 'Value' : 'Volume'} />
                <FormControlLabel control={<Switch checked={showShare} onChange={() => setShowShare(!showShare)} />} label={showShare ? 'Show Actual Values' : 'Show Shares (%)'} style={{ marginRight: '20px' }} />

                <Button variant="outlined" color="secondary" onClick={handleClearFilters} style={{ marginTop: '20px' }}>Clear Filters</Button>
            </div>

            {loading && <CircularProgress />}
            {error && <div>Error: {error}</div>}

            {!loading && rows.length > 0 && (
                <Paper>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>{columns.map((column, idx) => (<TableCell key={idx} style={{ fontWeight: 'bold' }}>{column}</TableCell>))}</TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.serialNumber}</TableCell>
                                    <TableCell>{row.Brand}</TableCell>
                                    <TableCell>{row.Model}</TableCell>
                                    <TableCell>{formatNumberIndian(row.Value)}</TableCell>
                                    <TableCell>{formatNumberIndian(row.Volume)}</TableCell>
                                    <TableCell>{row.Segment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            {!loading && totalRecords > 0 && (
                <Pagination count={Math.ceil(totalRecords / rowsPerPage)} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} />
            )}

            {!loading && rows.length === 0 && <div>No data available for the selected filters.</div>}
        </div>
    );
}

export default ExtractionModelWise;
