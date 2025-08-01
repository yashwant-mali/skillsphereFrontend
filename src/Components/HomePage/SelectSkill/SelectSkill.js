import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useGetImagesQuery } from '../../../features/api/imageSlice';
import { useNavigate } from 'react-router-dom';

export default function SelectSkill() {
    const { data: imageData } = useGetImagesQuery();
    const [skillType, setSkilType] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (imageData) {
            const skillSet = [...new Set(imageData.map((e) => e.ImageType))];
            setSkilType(skillSet);
        }
    }, [imageData]);

    // console.log(skillType);

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" sx={{ mb: 3, color: "#1565c0" }}>
                Learn New Skill Today
            </Typography>
            <Box
                sx={{
                    backgroundColor: '#f0f0f0',
                    height: 'auto',
                    width: { xs: "90%", md: "60%" },
                    mx: "auto",
                    py: 2,
                    px: 3,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 2,
                    borderRadius: 4,
                    boxShadow: 2,
                }}
            >
                {skillType.map((skill, index) => (
                    <Paper
                        key={index}
                        elevation={4}
                        onClick={() => navigate(`/SkillList/${skill}`)}
                        sx={{
                            px: 3,
                            py: 1.5,
                            backgroundColor: "#283593",
                            color: "#fff",
                            fontSize: "0.95rem",
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#3949ab",
                                transform: "translateY(-2px) scale(1.05)",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
                            }
                        }}
                    >
                        {skill}
                    </Paper>
                ))}
            </Box>
        </Box >
    );
}
