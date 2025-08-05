import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useGetRegisteredUsersQuery } from '../../features/api/apiSlice';

export default function Login({ onFormChange }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("login", "loggedIn");
        onFormChange(formData);
        window.location.reload();
    };

    const handleRegister = () => {
        navigate('/Register');
    };

    return (
        <Box
            className="loginPage"
            sx={{
                minHeight: '100vh',
                backgroundColor: '#e3f2fd', // <-- light blue background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    mb: 3,
                    px: 2,
                    py: 1,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 2,
                    width: { xs: '90vw', sm: '400px', md: '500px' },
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2">
                    Any Email Id with Any Password will be accepted—authentication is <b>off</b> for now for easy access.
                </Typography>
            </Box>
            <Container
                maxWidth="xs"
                disableGutters
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        padding: { xs: 2, sm: 4 },
                        borderRadius: 3,
                        width: { xs: '90vw', sm: '400px', md: '450px' },
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" gutterBottom>
                            SIGN IN
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                autoComplete="email"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                required
                                autoComplete="current-password"
                            />
                            <Button variant="contained" type="submit" color="success" fullWidth>
                                Submit
                            </Button>
                            <Typography align="center">
                                Not Registered Yet?{' '}
                                <Button onClick={handleRegister} variant="outlined" size="small">
                                    Register Now
                                </Button>
                            </Typography>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
