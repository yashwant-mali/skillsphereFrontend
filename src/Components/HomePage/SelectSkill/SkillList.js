import React from 'react';
import { useGetImagesQuery } from '../../../features/api/imageSlice';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';


export default function SkillList() {
    const { data: skills } = useGetImagesQuery();
    const { skillType } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const filteredSkills = useMemo(() => {
        return skills?.filter((skillset) =>
            skillset.ImageType?.toLowerCase() === skillType?.toLowerCase()
        );
    }, [skills, skillType]);


    const handleSkill = (skill) => {
        // navigate(`/details/${encodeURIComponent(skill.Name)}`);
        navigate(`/details/${skill.Name}`);

        console.log(skills)
    }

    // console.log(skills[0]);



    return (
        <Box sx={{ p: 3 }} >
            <Typography variant="h4" sx={{  mb: 4, color: theme.palette.primary.main, textAlign: 'center' }}>
                {skillType} Skills
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {filteredSkills?.map((skill, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "transform 0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <CardMedia
                                onClick={() => handleSkill(skill)}
                                component="img"
                                height="180"
                                image={`/images/${skill.ImagePath}`}
                                alt={skill.Name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ textAlign: 'center', bgcolor: '#fafafa' }}>
                                <Typography variant="h6" color="text.primary">
                                    {skill.Name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {skill.ImageType}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
