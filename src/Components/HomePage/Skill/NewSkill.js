import React, { useState } from 'react';
import { useGetImagesQuery } from '../../../features/api/imageSlice';
import {
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Button
} from '@mui/material';
import { useCreateSkillMutation } from '../../../features/api/imageSlice';
import { useNavigate } from 'react-router-dom';

export default function NewSkill() {
    const { data: image = [] } = useGetImagesQuery();
    const uniqueTypes = [...new Set(image.map(e => e.ImageType))];
    const [createSkill] = useCreateSkillMutation();

    const [skill, setSkill] = useState({
        ImagePath: '',
        Name: '',
        ImageType: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSkill({ ...skill, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("New Skill Added");
        try {
            const result = await createSkill(skill).unwrap();
            console.log('Skill created successfully:', result);
            console.log(skill);
            navigate('/');
        } catch (error) {
            console.error('Error creating Skill:', error);
            alert(`Failed to create Skill: ${error?.data?.error || 'Unknown error'}`);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
                mx: 'auto',
                mt: 4,
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                position: "relative",
                top: "100px"
            }}
        >
            <Typography variant="h5" gutterBottom>
                Add New Skill
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
                <TextField
                    label="eg. - ImageName.png"
                    variant="outlined"
                    name="ImagePath"
                    value={skill.ImagePath}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="New Skill Name"
                    variant="outlined"
                    name="Name"
                    value={skill.Name}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Skill Type</InputLabel>
                    <Select
                        name="ImageType"
                        value={skill.ImageType}
                        label="Skill Type"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>Select Skill Type</em></MenuItem>
                        {uniqueTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
