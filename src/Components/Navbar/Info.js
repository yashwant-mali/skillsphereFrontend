import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ExploreIcon from '@mui/icons-material/Explore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Info = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 0, mb: 6, pt: 4 }}>
        <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, backgroundColor: '#f0faff' }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1565c0' }}
          >
            About SkillSphere
          </Typography>

          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Discover, Learn, and Grow with the Best Teachers and Institutes
          </Typography>

          <Divider sx={{ mb: 6 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                <strong>SkillSphere</strong> is your one-stop platform to explore, compare, and enroll in skills from both indoor and outdoor domains. From coding, design, and music to sports, dance, and photography — find everything you want to learn in one place.
              </Typography>

              <Typography variant="body1" paragraph>
                We bring together the best <strong>teachers</strong> and <strong>institutes</strong> from around the world, giving you verified information, transparent pricing, and a smooth learning journey.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon><ExploreIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Explore a variety of indoor and outdoor skills" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SchoolIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Connect with verified educators and institutes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><EmojiEventsIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Learn from experienced, top-rated professionals" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CreditCardIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Secure course purchases and transparent fees" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="All skills, all in one platform" />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="body1" align="center">
              Whether you're a beginner or looking to master something new, <strong>SkillSphere</strong> makes learning accessible, trusted, and enjoyable.
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Sticky Footer-style Contact Us Bar */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#1976d2',
          color: '#fff',
          py: 2,
          px: { xs: 2, sm: 6 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 1300,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <ContactMailIcon />
          <Typography variant="body1">Need help? Contact our support team</Typography>
        </Box>
        <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }}>
          Contact Us
        </Button>
      </Box>
    </>
  );
};

export default Info;
