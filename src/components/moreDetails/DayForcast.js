import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicCard from '../commonComponents/Card';
import Typography from '@mui/material/Typography';
import {getLocalTime} from '../utils'


const DayForcast = ({data}) => {

  console.log(data, 'sclientd');

  const newData = data.list.slice(0,5).map((item) => {
    return {
      time: getLocalTime(item.dt, data.city.timezone ),
      icon: item.weather[0].icon,
      temp: Math.round(item.main.temp)
    }
  })

  console.log(newData);

  return (
      <Box sx={{ flexGrow: 1, margin: "30px auto" }}>
        <Typography sx={{ fontSize: "22", color: "black", fontWeight: "bold"}}>
          Hourly Forcast
        </Typography>
        <Grid container spacing={0.5}>
          {newData.map((item) => (
            <Grid item xs={2} key={item.id} sx={{margin: "20px auto"}}>
              <BasicCard data={item}/>
            </Grid>
          ))}
        </Grid>
      </Box>
  );
}

export default DayForcast

