import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const CityInfo = ({data}) => {
  return (
    <div style={{margin: "10px auto"}}>
      <Grid container spacing={2}>
        {Object.entries(data).map(([label, value], index) => (
          <Grid item xs={6} key={index}>
            <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', marginTop: '0px', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <CardContent sx={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                <span>
                  <img src={`icons/${label}.png`} alt={`${label} Icon`} style={{ width: '24px', marginRight: '10px', color: "white" }} />
                </span>
                <div>
                  <Typography sx={{ fontSize: "18", color: "#fff" }}>
                    {label}
                  </Typography>
                  <Typography variant="h3" sx={{ fontSize: "25", color: "#fff" }}>
                    {value}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </div>
  )
}

export default CityInfo