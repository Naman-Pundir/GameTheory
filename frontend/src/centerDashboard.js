import React, { useEffect, useState } from 'react';
import SportsSelector from './sportsSelecter';
import BookingTable from './bookingTable';
import axios from 'axios';
import {
    Container,
    Typography,
    Grid,
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const BASE_URL = 'http://127.0.0.1:8080';

const CenterDashboard = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [date, setDate] = useState(() => {
        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        return today;
    });
    const [selectedSport, setSelectedSport] = useState('');
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/center/`);
                setCenters(response.data);
                if (response.data.length > 0) {
                    setSelectedCenter(response.data[0]._id);
                }
            } catch (error) {
                console.error('Error fetching centers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCenters();
    }, []);

    useEffect(() => {
        const fetchSports = async () => {
            if (selectedCenter) {
                try {
                    const response = await axios.get(`${BASE_URL}/center/${selectedCenter}/sports`);
                    setSports(response.data.sports);
                    if (response.data.sports.length > 0) {
                        setSelectedSport(response.data.sports[0].sport_id);
                    }
                } catch (error) {
                    console.error(`Error fetching sports for center ${selectedCenter}:`, error);
                }
            }
        };

        fetchSports();
    }, [selectedCenter]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ fontWeight: 'bold', marginTop: 3 }}
            >
                Welcome to Nexus Sports
            </Typography>

            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ overflow: 'visible' }}>
                        <InputLabel id="center-select-label">Select Center</InputLabel>
                        <Select
                            labelId="center-select-label"
                            value={selectedCenter}
                            onChange={(e) => setSelectedCenter(e.target.value)}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                    },
                                },
                            }}
                            sx={{
                                '.MuiInputBase-root': {
                                    height: '48px',
                                },
                                '.MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                            }}
                        >
                            {centers.map((center) => (
                                <MenuItem key={center._id} value={center._id}>
                                    {center.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Select Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>

            <SportsSelector 
                selectedCenter={selectedCenter} 
                selectedSport={selectedSport} 
                setSelectedSport={setSelectedSport} 
                sports={sports} 
            />

            <BookingTable 
                selectedCenter={selectedCenter} 
                selectedSport={selectedSport} 
                selectedDate={date} 
            />
        </Container>
    );
};

export default CenterDashboard;
