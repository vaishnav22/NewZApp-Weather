import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {formatReadableDate} from '../utils'
import Button from '@mui/material/Button';

const SearchHistory = ({data}) => {
  const [searchHistoryData, setSearchHistoryData] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistoryData(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistoryData([]);
  };

  return (
    <>
    <div style={{ width: '80%', margin:'0 auto', textAlign: "center" }}>
      <Typography variant='h4' sx={{ margin: "0px auto" }}>
          Search History
        </Typography>
    </div>
    <div style={{ width: '80%', margin:'0 auto', textAlign: "right" }}>
      <Button variant="text" onClick={clearHistory}>Clear History</Button>
      {searchHistoryData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <div>
              <Typography>{item.location}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
          <Grid container spacing={2}>
                <Grid item xs={6} sx={{ margin: "auto"}}>
                    {/* Left column */}
                    <Typography sx={{ textAlign: 'start' }}>Temparature</Typography>
                    <Typography sx={{ textAlign: 'start' }}>High Temparature</Typography>
                    <Typography sx={{ textAlign: 'start' }}>Low Temparature</Typography>
                    <Typography sx={{ textAlign: 'start' }}>Date/Time</Typography>
                    
                </Grid>
                <Grid item xs={6} sx={{ alignItems: "start" }}>
                    {/* Right column */}
                    <Typography sx={{ textAlign: 'end' }}>{item.currentTemp}°C</Typography>
                    <Typography sx={{ textAlign: 'end' }}>{item.tempMax}°C</Typography>
                    <Typography sx={{ textAlign: 'end' }}>{item.tempMin}°C</Typography>
                    <Typography sx={{ textAlign: 'end' }}>{formatReadableDate(item.dateTime)}</Typography>
                </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
    </>
  );
};

export default SearchHistory;
