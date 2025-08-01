import React from 'react';
import { useGetRegisteredUsersQuery } from '../../features/api/apiSlice';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Avatar
} from '@mui/material';
import './Profile.css'

export default function Profile({ formData }) {
  const { data: users = [], isLoading, isError, error } = useGetRegisteredUsersQuery();
  const email = 'yashwantmali555@gmail.com'; // or formData.email

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error?.message || 'Something went wrong'}</Alert>
      </Container>
    );

  const user = users.find((user) => user.email === email);

  if (!user)
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="warning">No user found with the email: {email}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 0, pt: 2 }}>

      <Typography variant="h4" gutterBottom align="center">
        User Profile
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 3, background: '#f5f5f5', pt: 3 }}>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt={user.name}
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        </Box>

        <CardContent>


          <Typography variant="h5" component="div" gutterBottom align="center">
            {user.name}
          </Typography>

          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography variant="body1">
            <strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}
          </Typography>

          <Typography variant="body1">
            <strong>Gender:</strong> {user.gender}
          </Typography>


        </CardContent>

      </Card>
    </Container>
  );
}
