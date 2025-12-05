import React, { useState } from 'react'
import Advertisement from '../HomePage/Advertisement/Advertisement';
import SelectSkill from '../HomePage/SelectSkill/SelectSkill';
import Skill from '../HomePage/Skill/Skill';
import { useGetImagesQuery } from '../../features/api/imageSlice'


// 🧠 MUI imports
import { CssBaseline, Box } from '@mui/material';
import { CircularProgress, Typography } from '@mui/material';


export default function Home({ isLoggedIn }) {
    const { data: images, isLoading, isFetching, isError, error } = useGetImagesQuery();

    // Get unique skill types from images
    const skillTypes = images && Array.isArray(images)
        ? [...new Set(images.map(img => img.ImageType))]
        : [];

    if (!isLoggedIn) return null;

    if (isLoading || isFetching) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 6, flexDirection: 'column', gap: '20px' }}>
                <div>Loading...</div>
                <CircularProgress />
            </Box>
        );
    }

    // Show error
    if (isError) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error">Failed to load skills. {error?.message || ''}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: 0, py: 0 }}>
            <Box sx={{ mb: 4 }}><Advertisement /></Box>
            <Box sx={{ mb: 4 }}><SelectSkill /></Box>

            {skillTypes.length === 0 ? (
                // images are loaded but no skill types found
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6">No skills to display yet.</Typography>
                    <Typography variant="body2">Be the first to add a skill.</Typography>
                </Box>
            ) : (
                skillTypes.map((type) => (
                    <Box sx={{ mb: 4 }} key={type}>
                        <Skill
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                            photos={images.filter(img => img.ImageType === type)}
                        />
                    </Box>
                ))
            )}
        </Box>
    );
}
