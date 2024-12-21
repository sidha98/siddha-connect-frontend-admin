import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
    ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { CircularProgress, Button, TextField, FormControl, Select, MenuItem, OutlinedInput, Chip, FormControlLabel, Switch } from '@mui/material';
import config from '../../config';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const { backend_url } = config;

function ExtractionGraphs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [segment, setSegment] = useState([]);
    const [dealerCode, setDealerCode] = useState([]);
    const [tse, setTse] = useState([]);
    const [type, setType] = useState([]);
    const [area, setArea] = useState([]);
    const [tlName, setTlName] = useState([]);
    const [abm, setAbm] = useState([]);
    const [ase, setAse] = useState([]);
    const [asm, setAsm] = useState([]);
    const [rso, setRso] = useState([]);
    const [zsm, setZsm] = useState([]);
    const [valueToggle, setValueToggle] = useState(true);  // Value or Volume toggle
    const [showShare, setShowShare] = useState(false);  // Share toggle

    // Dropdown options (to fetch filter options dynamically)
    const [segmentOptions, setSegmentOptions] = useState([]);
    const [dealerOptions, setDealerOptions] = useState([]);
    const [tseOptions, setTseOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);
    const [tlNameOptions, setTlNameOptions] = useState([]);
    const [abmOptions, setAbmOptions] = useState([]);
    const [aseOptions, setAseOptions] = useState([]);
    const [asmOptions, setAsmOptions] = useState([]);
    const [rsoOptions, setRsoOptions] = useState([]);
    const [zsmOptions, setZsmOptions] = useState([]);

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const segmentResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=productId.Segment`);
            setSegmentOptions(segmentResponse.data.uniqueValues || []);

            const dealerResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=dealerCode`);
            setDealerOptions(dealerResponse.data.uniqueValues || []);

            const tseResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=uploadedBy`);
            setTseOptions(tseResponse.data.uniqueValues || []);

            const typeResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=TYPE`);
            setTypeOptions(typeResponse.data.uniqueValues || []);

            const areaResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=Area`);
            setAreaOptions(areaResponse.data.uniqueValues || []);

            const tlNameResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=TL NAME`);
            setTlNameOptions(tlNameResponse.data.uniqueValues || []);

            const abmResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ABM`);
            setAbmOptions(abmResponse.data.uniqueValues || []);

            const aseResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ASE`);
            setAseOptions(aseResponse.data.uniqueValues || []);

            const asmResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ASM`);
            setAsmOptions(asmResponse.data.uniqueValues || []);

            const rsoResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=RSO`);
            setRsoOptions(rsoResponse.data.uniqueValues || []);

            const zsmResponse = await axios.get(`${backend_url}/extraction/unique-column-values?column=ZSM`);
            setZsmOptions(zsmResponse.data.uniqueValues || []);
        } catch (err) {
            console.error('Error fetching dropdown data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, segment, dealerCode, tse, type, area, tlName, abm, ase, asm, rso, zsm, valueToggle, showShare]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const valueVolume = valueToggle ? 'value' : 'volume';
            const filters = {
                startDate, endDate, segment, dealerCode, tse, type, area, tlName, abm, ase, asm, rso, zsm, valueVolume,
                showShare: showShare ? 'true' : 'false'
            };

            const response = await axios.get(`${backend_url}/extraction/overview-for-admins`, { params: filters });
            setData(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Helper function to prepare chart data
    const prepareChartData = () => {
        if (!data.length) return {};

        const brands = ['Samsung', 'Vivo', 'Oppo', 'Xiaomi', 'Apple', 'One Plus', 'Real Me', 'Motorola', 'Others'];
        const priceClasses = data.map(row => row['Price Class']);
        const datasets = brands.map(brand => ({
            label: brand,
            data: data.map(row => row[brand]),
            backgroundColor: getRandomColor(),
        }));

        return {
            labels: priceClasses,
            datasets,
        };
    };

    // Generate random colors for each brand
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div>
            <h2>Extraction Graphs</h2>

            {/* Filters Section */}
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    style={{ marginRight: '20px' }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    style={{ marginRight: '20px' }}
                />
                {/* Multi-Selects for other filters */}
                {/* Example for Segment */}
                <FormControl style={{ marginRight: '20px', width: '200px' }}>
                    <Select
                        multiple
                        value={segment}
                        onChange={(e) => setSegment(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                        input={<OutlinedInput label="Segment" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {segmentOptions.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {/* Toggle for Value/Volume */}
                <FormControlLabel
                    control={<Switch checked={valueToggle} onChange={() => setValueToggle(!valueToggle)} />}
                    label={valueToggle ? 'Value' : 'Volume'}
                />
                {/* Toggle for Show Share */}
                <FormControlLabel
                    control={<Switch checked={showShare} onChange={() => setShowShare(!showShare)} />}
                    label={showShare ? 'Show Actual Values' : 'Show Shares (%)'}
                />
                <Button variant="outlined" color="secondary" onClick={fetchData} style={{ marginTop: '20px' }}>
                    Apply Filters
                </Button>
            </div>

            {loading && <CircularProgress />}
            {error && <div>Error: {error}</div>}

            {/* Render Charts */}
            {!loading && data.length > 0 && (
                <div>
                    <div style={{ marginBottom: '40px' }}>
                        <Bar data={prepareChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        <Line data={prepareChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        <Pie data={prepareChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            )}

            {!loading && data.length === 0 && <div>No data available for the selected filters.</div>}
        </div>
    );
}

export default ExtractionGraphs;
