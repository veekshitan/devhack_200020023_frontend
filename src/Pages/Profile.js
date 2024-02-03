// StudentDetails.js
import React from 'react';
import { Container, Paper, Typography, Grid } from '@mui/material';
import TopHeader from './TopHeader';
import '../App.css';
import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         padding: '20px',
//         margin: '20px',
//         marginTop: '140px',
//     },
//     logoutButton: {
//         marginTop: '20px',
//         backgroundColor: theme.palette.error.main,
//         color: theme.palette.common.white,
//         '&:hover': {
//             backgroundColor: theme.palette.error.dark,
//         },
//     },
// }));

const Profile = () => {

    const navigate = useNavigate();

    const student = {
        name: 'John Doe',
        contactNumber: '123-456-7890',
        email: 'john.doe@gmail.com',
        rollNo: 'A123456',
        events: true,
        coupons: false,
    };

    const handleLogout = () => {
        // Perform logout actions (e.g., clear session, redirect to login page)
        // For now, let's just navigate back to the home page
        navigate('/');
    };

    return (
        <Container maxWidth="sm" className="container">
            <header className="App-header">
                <TopHeader />
            </header>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px', marginTop: '140px' }}>
                <Typography variant="h4" gutterBottom>
                    Student Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            <strong>Name:</strong> {student.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            <strong>Contact Number:</strong> {student.contactNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            <strong>Email ID:</strong> {student.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            <strong>Roll No:</strong> {student.rollNo}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            <strong>Participating in Events:</strong> {student.events ? 'Yes' : 'No'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            <strong>Eligible for Coupons:</strong> {student.coupons ? 'Yes' : 'No'}
                        </Typography>
                    </Grid>
                </Grid>
                <button variant="contained" color="primary" onClick={handleLogout} className="logoutButton">
                    Logout
                </button>
            </Paper>
        </Container >
    );
};

export default Profile;