import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import countryList from 'react-select-country-list';
import { useRegisterUserMutation } from '../../features/api/apiSlice';
import { useNavigate } from 'react-router-dom';

export default function Register({ OnUserRegistered }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    country: '',
    password: '',
  });

  const [registerUser] = useRegisterUserMutation();
  const countryOptions = countryList().getData();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      country: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('userData:', userData);
    OnUserRegistered(userData);
    try {
      await registerUser(userData).unwrap();
      alert('User registered successfully');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Error registering user');
    }

    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: '#fefefe', // soft background for form box
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={userData.dob}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ fontSize: '1rem' }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }}
                >
                  <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                  <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>


            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  value={userData.country}
                  label="Country"
                  onChange={handleCountryChange}
                >
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
