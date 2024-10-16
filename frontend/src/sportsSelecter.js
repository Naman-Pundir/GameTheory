import React from 'react';
import { Box, Paper, RadioGroup, FormControlLabel, Radio, Typography, Divider } from '@mui/material';

const SportsSelector = ({ selectedCenter, selectedSport, setSelectedSport, sports }) => {
    const handleSportChange = (sportId) => {
        setSelectedSport(sportId);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Paper 
                sx={{ 
                    padding: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    boxShadow: 3,
                    marginRight: 2 
                }} 
            >
                <Typography variant="h6" gutterBottom sx={{ marginRight: 2 }}>
                    Select Sport
                </Typography>
            </Paper>
            <Divider orientation="vertical" flexItem sx={{ marginRight: 2 }} />
            <RadioGroup
                value={selectedSport}
                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
            >
                {sports.map((sport) => (
                    <FormControlLabel
                        key={sport.sport_id}
                        control={<Radio sx={{ display: 'none' }} />} 
                        label={
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    padding: 2, 
                                    width: 120, 
                                    textAlign: 'center', 
                                    cursor: 'pointer', 
                                    border: selectedSport === sport.sport_id ? '2px solid blue' : '2px solid transparent', 
                                    borderRadius: 2,
                                    transition: 'border-color 0.3s', 
                                    '&:hover': {
                                        border: '2px solid lightblue',
                                    }
                                }} 
                                onClick={() => handleSportChange(sport.sport_id)}
                            >
                                {sport.name}
                            </Paper>
                        }
                    />
                ))}
            </RadioGroup>
        </Box>
    );
};

export default SportsSelector;
