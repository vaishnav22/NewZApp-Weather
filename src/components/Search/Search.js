import React, { useState } from 'react';
import { debounce } from 'lodash'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack  from '@mui/material/Stack';
import {Box} from "@mui/system"

import { GEO_URL, apiOptions } from '../api';

const Search = ({onLocationSelect}) => {
  const [location, setLoction] = useState(null);
  const [locationResult, setLocationResult] = useState([]);

  const locationSearch = async (value) => {
    try {
      const response = await fetch(`${GEO_URL}?namePrefix=${value}`, apiOptions);
      const result = await response.json();
      console.log(result.data)
      setLocationResult(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedSetLocation = debounce((value) => {
    locationSearch(value);
  }, 800);

  const onChange = (event, locationData) => {
    debouncedSetLocation(locationData);
  }

  const hadleSelect = (event, selectedOption) => {
    if (selectedOption) {
      
      const locationData = {
        latitude: selectedOption.latitude,
        longitude: selectedOption.longitude,
        name: selectedOption.name,
      };
      onLocationSelect(locationData);
      setLoction(locationData);
    } else {
      // Handle the case when selectedOption is not defined (e.g., display an error message or handle it as needed)
      console.error('No location selected.');
    }
  }
  

  return (
    <Stack sx={{ width: "100%"}}>
      <Autocomplete
      freeSolo={true}
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(locationResult) => `${locationResult.city}, ${locationResult.countryCode}`}
        options={locationResult}
        sx={{ width: "100%" , borderRadius: "30"}}
        onInputChange={onChange}
        renderInput={(params) => <TextField {...params} label="Search for a city or airport" />}
        onChange={hadleSelect}
      />
    </Stack>
  );
}

export default Search;
