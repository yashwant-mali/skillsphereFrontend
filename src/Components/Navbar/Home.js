import React, { useState } from 'react'
import Advertisement from '../HomePage/Advertisement/Advertisement';
import SelectSkill from '../HomePage/SelectSkill/SelectSkill';
import Skill from '../HomePage/Skill/Skill';
import { useGetImagesQuery } from '../../features/api/imageSlice'


// 🧠 MUI imports
import { CssBaseline, Box } from '@mui/material';


export default function Home({ isLoggedIn }) {
    const { data: images } = useGetImagesQuery();

    // Get unique skill types from images
    const skillTypes = images ? [...new Set(images.map(img => img.ImageType))] : [];

    return (
        <div>
            {isLoggedIn && (
                <Box sx={{ px: 0, py: 0 }}>
                    <Box sx={{ mb: 4 }}><Advertisement /></Box>
                    <Box sx={{ mb: 4 }}><SelectSkill /></Box>
                    {skillTypes.map((type) => (
                        <Box sx={{ mb: 4 }} key={type}>
                            <Skill
                                title={type.charAt(0).toUpperCase() + type.slice(1)}
                                photos={images.filter(img => img.ImageType === type)}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </div>
    );
}
