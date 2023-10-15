import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


 const BasicCard = ({data}) => {
  // console.log(data,'from the basic card');
  return (
    <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <CardContent sx={{margin: "auto"}}>
        <Typography sx={{ fontSize: "14", color: "#fff"}}>
          {data.time}
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "18", color: "#fff"}}>
          {data.temp}°C
        </Typography>
        <Avatar src={`icons/${data.icon}.png`} alt="Icon" sx={{ width: 40, height: 40, backgroundColor: "transparent" }} /> 
      </CardContent>
    </Card>
  );
}

export default BasicCard;