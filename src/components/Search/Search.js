import React, { useState } from 'react';
import { debounce } from 'lodash'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack  from '@mui/material/Stack';
import {Box} from "@mui/system"

import { GEO_URL, apiOptions } from '../api';

const Search = () => {
  const [location, setLoction] = useState(null);
  const [locationResult, setLocationResult] = useState([]);

  const locationSearch = async (value) => {
    try {
      const response = await fetch(`${GEO_URL}?namePrefix=${value}`, apiOptions);
      const result = await response.json();
      // console.log(result.data)
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
    console.log(selectedOption);
    // const locationData ={
    //   latitude: selectedOption.latitude,
    //   longitude: selectedOption.longitude,
    //   name: 
    // }
    setLoction(selectedOption)
  }

  return (
    <Stack sx={{ width: 500}}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(locationResult) => `${locationResult.city}, ${locationResult.countryCode}`}
        options={locationResult}
        sx={{ width: 500 }}
        onInputChange={onChange}
        noOptionsText="City not available"
        renderInput={(params) => <TextField {...params} label="Search for a city or airport" />}
        onChange={hadleSelect}
      />
    </Stack>
  );
}

export default Search;
