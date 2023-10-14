import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



 const BasicCard = (data) => {
  console.log(data,'from the basic card');
  return (
    <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', marginTop: '5px', backgroundColor: '#222222' }}>
      <CardContent sx={{margin: "auto"}}>
        <Typography sx={{ fontSize: "18", color: "#fff"}}>
          {/* {data} */}
        </Typography>
        
      </CardContent>
    </Card>
  );
}

export default BasicCard;