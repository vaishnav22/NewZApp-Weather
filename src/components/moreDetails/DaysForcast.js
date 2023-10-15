import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { getLocalTime } from '../utils';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


const DaysForcast = ({data}) => {
    const [value, setValue] = React.useState(0);
    const dayInAWeek = new Date().getDate()
    const forcastDays = weekDays.slice(dayInAWeek, weekDays.length).concat(weekDays.slice(0, dayInAWeek))

    const filteredData = data.list.reduce((acc, item) => {
        const day = item.dt_txt.split(' ')[0];
        if (!acc.uniqueDays.has(day)) {
          acc.uniqueDays.add(day);
          acc.result.push(item);
        }
        return acc;
      }, { uniqueDays: new Set(), result: [] }).result;

      console.log(filteredData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabIcon = ({ iconPath }) => (
        <img src={`icons/${iconPath}.png`} alt="Icon" style={{ width: '24px' }} />
      );

    return (
        
        <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: "22", color: "black", fontWeight: "bold"}}>
                5-Day Forcast
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {filteredData.map((item, index) => (
                    <Tab icon={<TabIcon iconPath={item.weather[0].icon} />} label={forcastDays[index]} {...a11yProps(index)} key={index} />
                ))}
                </Tabs>
            </Box>
            {filteredData.slice(1, filteredData.length).map((item, index) => (
                <CustomTabPanel value={value} index={index} key={index}>
                    <Card sx={{width: '100%', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{ margin: "auto"}}>
                                    {/* Left column */}
                                    <Typography sx={{ textAlign: 'start' }}>High Temp</Typography>
                                    <Typography sx={{ textAlign: 'start' }}>Low Temp</Typography>
                                    <Typography sx={{ textAlign: 'start' }}>Humidity</Typography>
                                    <Typography sx={{ textAlign: 'start' }}>Pressure</Typography>
                                    <Typography sx={{ textAlign: 'start' }}>Wind Speed</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ alignItems: "start" }}>
                                    {/* Right column */}
                                    <Typography sx={{ textAlign: 'end' }}>{item.main.temp_max}°C</Typography>
                                    <Typography sx={{ textAlign: 'end' }}>{item.main.temp_min}°C</Typography>
                                    <Typography sx={{ textAlign: 'end' }}>{item.main.humidity}%</Typography>
                                    <Typography sx={{ textAlign: 'end' }}>{item.main.pressure} hPa</Typography>
                                    <Typography sx={{ textAlign: 'end' }}>{item.wind.speed} MPH</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </CustomTabPanel>
            ))}
        </Box>
      );
}

export default DaysForcast

