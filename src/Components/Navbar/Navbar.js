import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, useMediaQuery, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import './Navbar.css';

export default function Navbar({ formData, setFormData, setIsLoggedIn }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    return (
        <div className="NavBarContainer">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Box className="NavLeft" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/home" className="nav-link">
                        <img
                            src="/images/svgs/LOGO.png"
                            alt="LOGO"
                            style={{ height: '70px', marginRight: '20px' }}
                        />
                    </Link>
                </Box>

                {isMobile ? (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={handleDrawerClose}
                        >
                            <Box
                                sx={{ width: 220 }}
                                role="presentation"
                                onClick={handleDrawerClose}
                                onKeyDown={handleDrawerClose}
                            >
                                <List>
                                    <ListItem button component={Link} to="/home">
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/info">
                                        <ListItemText primary="Information" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/profile">
                                        <ListItemText primary="Profile" />
                                    </ListItem>
                                </List>
                                <Divider />
                                <Box sx={{ p: 2 }}>
                                    <Button
                                        className="logOutButton"
                                        variant="contained"
                                        fullWidth
                                        onClick={() => {
                                            setFormData({ email: '', password: '' });
                                            setIsLoggedIn(false);
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </Box>
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <>
                        <Box
                            className="NavCenter"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                            }}
                        >
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
                        <Box
                            className="NavRight"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                className="logOutButton"
                                variant="contained"
                                onClick={() => {
                                    setFormData({ email: '', password: '' });
                                    setIsLoggedIn(false);
                                }}
                                sx={{ marginRight: 2 }}
                            >
                                Sign Out
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </div>
    );
}
