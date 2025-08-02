import React, { useEffect, useMemo, useState } from 'react';
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

    const { data: users, isLoading, isError, error } = useGetRegisteredUsersQuery();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    };

    //this method is setting localStorage item to loggedIn when the user logs in
    //and forcely reloading the page because of setLogin state issue its not working here
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData.email, formData.password);
        localStorage.setItem("login", "loggedIn");
        onFormChange(formData);
        window.location.reload(); // This will reload the page

    };

    const handleRegister = () => {
        navigate('/Register');
    };

    return (
        <Box className="loginPage">
            <Container maxWidth="sm">
                <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
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
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <Button variant="contained" type="submit" color="success">
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
