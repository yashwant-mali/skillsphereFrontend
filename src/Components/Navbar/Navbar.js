import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './Navbar.css';

export default function Navbar({ formData, setFormData, setIsLoggedIn }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className="NavBarContainer">
            <Box className="NavCenter">
                <Typography variant="h6">
                    <Link to="/home" className="nav-link">Home</Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/info" className="nav-link">Information</Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </Typography>
            </Box>

            <Box className="NavRight">
                <Button
                    className="logOutButton"
                    variant="contained"
                    onClick={() => {
                        setFormData({ email: '', password: '' });
                        setIsLoggedIn(false);
                    }}
                >
                    Sign Out
                </Button>
            </Box>
        </div>
    );
}
