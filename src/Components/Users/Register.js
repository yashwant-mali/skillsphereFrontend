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
        background: 'linear-gradient(135deg, #90caf9 0%, #e3f2fd 100%)',
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
            p: { xs: 2, sm: 4 },
            boxShadow: 6,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
            backdropFilter: 'blur(4px)',
            border: '1px solid #bbdefb',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              letterSpacing: 1,
              mb: 2,
            }}
          >
            Register
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: '#f3f6fb' },
                }}
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
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: '#f3f6fb' },
                }}
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
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: '#f3f6fb' },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel
                  component="legend"
                  sx={{ fontSize: '1rem', color: '#1976d2', mb: 1 }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  sx={{
                    '& .MuiFormControlLabel-label': { fontSize: '1rem' },
                    justifyContent: 'center',
                  }}
                >
                  <FormControlLabel value="male" control={<Radio size="small" color="primary" />} label="Male" />
                  <FormControlLabel value="female" control={<Radio size="small" color="primary" />} label="Female" />
                  <FormControlLabel value="other" control={<Radio size="small" color="primary" />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ width: 220 }}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  value={userData.country}
                  label="Country"
                  onChange={handleCountryChange}
                  sx={{
                    borderRadius: 2,
                    background: '#f3f6fb',
                  }}
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
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: '#f3f6fb' },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: 2,
                  py: 1.2,
                  background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                  transition: 'background 0.3s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)',
                  },
                }}
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
