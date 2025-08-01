import React from 'react';
import { useGetTeachersQuery } from '../../features/api/teachersSlice';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import './Details.css';

export default function TeacherDetails() {
    const { data: teachers, isLoading, isError } = useGetTeachersQuery();
    const { name, institute } = useParams();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !teachers) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error">Something went wrong or no data found.</Alert>
            </Container>
        );
    }

    const filteredTeacher = teachers.find(
        (e) => e.SkillName === name && e.Institute === institute
    );

    if (!filteredTeacher) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="warning">No details found for this teacher.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 0, pt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Teacher Details
            </Typography>
            <Card sx={{ borderRadius: 3, boxShadow: 3, background: '#f9f9f9' }}>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Institute" secondary={filteredTeacher.Institute} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Address" secondary={filteredTeacher.Address} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Country" secondary={filteredTeacher.Country} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Skill" secondary={filteredTeacher.SkillName} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Period (months)"
                                secondary={filteredTeacher.PeriodInMonths}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Fees" secondary={`₹${filteredTeacher.Fees}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Rating" secondary={filteredTeacher.Rating} />
                        </ListItem>
                    </List>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" color="primary" size="large">
                            PAY FEES
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
