import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import chess1 from '../../../images/advertisement/chess_child.jpeg';
import chess2 from '../../../images/advertisement/chess_happy.png';
import chess3 from '../../../images/advertisement/chess.jpeg';
import sing from '../../../images/advertisement/sing.jpeg';
import dance from '../../../images/advertisement/dance.jpeg';
import cricket from '../../../images/advertisement/cricket.jpeg';
import singsong from '../../../images/advertisement/sing_dance_learn.jpeg';

// Carousel images
const images = [
    { src: chess1, width: 600 },
    { src: chess2, width: 550 },
    { src: chess3, width: 620 },
    { src: sing, width: 580 },
    { src: dance, width: 600 },
    { src: cricket, width: 640 },
    { src: singsong, width: 630 },
];

export default function Advertisement() {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        const carousel = carouselRef.current;
        const children = carousel?.children;
        if (carousel && children?.[currentIndex]) {
            children[currentIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [currentIndex]);

    return (
        <Box sx={{
            py: 4, bgcolor: '#fafafa', width: '100%', background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
            backgroundAttachment: 'fixed',
        }}>
            <Typography variant="h4" align="center" sx={{ mb: 3, color: '#080808ff' }}>
                <span style={{ textDecoration: 'underline' }}>Advertisements</span>
            </Typography>
            <Box
                ref={carouselRef}
                sx={{
                    display: 'flex',
                    gap: 4,
                    overflowX: 'auto',
                    px: '25vw',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                }}
            >
                {images.map((img, idx) => (
                    <Box
                        key={idx}
                        component="img"
                        src={img.src}
                        alt={`Ad-${idx}`}
                        sx={{
                            width: img.width,
                            height: 300,
                            objectFit: 'cover',
                            flexShrink: 0,
                            scrollSnapAlign: 'center',
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.07)',
                                boxShadow: '0 6px 30px rgba(0,0,0,0.4)',
                            },
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
