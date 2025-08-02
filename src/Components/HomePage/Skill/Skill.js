import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    useTheme
} from "@mui/material";

export default function Skill({ title, photos = [] }) {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSkill = (photo, idx) => {
        navigate(`/details/${photos[idx].Name}`)
    }

    return (
        <Box sx={{ mb: 6, px: 2 }}>
            <Typography variant="h4" sx={{
                mx: 2, mb: 2, textAlign: "center",
                // color: theme.palette.primary.main 
            }}>
                <span style={{ textDecoration: 'underline' }}>{title}</span>
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 3,
                    pb: 1,
                    scrollBehavior: "smooth",
                    "&::-webkit-scrollbar": { height: 8, background: "#eee" },
                    "&::-webkit-scrollbar-thumb": { background: theme.palette.divider, borderRadius: 4 },
                    whiteSpace: "nowrap",
                }}
            // onWheel={e => {
            //     if (e.deltaY !== 0) {
            //         e.currentTarget.scrollLeft += e.deltaY;
            //         e.preventDefault();
            //     }
            // }}
            >
                {photos.map((photo, idx) => (
                    <Card
                        className="clickable"
                        key={idx}
                        sx={{
                            minWidth: 180,
                            maxWidth: 180,
                            flexShrink: 0,
                            boxShadow: 3,
                            borderRadius: 3,
                            transition: "transform 0.3s, border-color 0.3s",
                            "&:hover": {
                                transform: "scale(1.05)",
                                borderColor: theme.palette.primary.main,
                            },
                            border: `2px solid black`,
                            display: "inline-block",
                        }}
                    >
                        <CardMedia
                            onClick={() => handleSkill(photo, idx)}
                            component="img"
                            height="120"
                            image={`images/${photo.ImagePath}`}
                            alt={`Skill-${idx}`}
                            sx={{ borderRadius: "12px 12px 0 0", objectFit: "cover" }}
                        />
                        <CardContent sx={{ textAlign: "center", bgcolor: "#fafafa" }}>
                            <Typography variant="subtitle2" color="text.primary">
                                {photo.Name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}

                <img
                    className="clickable"
                    style={{ height: '70px', margin: '50px', display: 'inline-block' }}
                    src="/images/svgs/addMoreSmall.png"
                    alt="add more"
                    onClick={() => navigate('/newSkill')}
                />

            </Box>
        </Box>
    );
}
