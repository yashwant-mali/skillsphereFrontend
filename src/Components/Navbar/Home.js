import React, { useState } from 'react'
import Advertisement from '../HomePage/Advertisement/Advertisement';
import SelectSkill from '../HomePage/SelectSkill/SelectSkill';
import Skill from '../HomePage/Skill/Skill';
import { useGetImagesQuery } from '../../features/api/imageSlice'


// 🧠 MUI imports
import { CssBaseline, Box } from '@mui/material';


export default function Home({ isLoggedIn }) {

    const { data: images } = useGetImagesQuery();

    const sports = images?.filter((sport) => sport.ImageType === 'sports');
    const dance = images?.filter((sport) => sport.ImageType === 'dance');
    const music = images?.filter((sport) => sport.ImageType === 'music');



    return (
        <div>
            {
                isLoggedIn && (
                    <Box sx={{ px: 2, py: 4 }}>
                        <Box sx={{ mb: 4 }}><Advertisement /></Box>
                        <Box sx={{ mb: 4 }}><SelectSkill /></Box>
                        <Box sx={{ mb: 4 }}><Skill title="Sports" photos={sports} /></Box>
                        <Box sx={{ mb: 4 }}><Skill title="Dance" photos={dance} /></Box>
                        <Box sx={{ mb: 4 }}><Skill title="Song" photos={music} /></Box>
                    </Box>
                )
            }
        </div >
    )
}
